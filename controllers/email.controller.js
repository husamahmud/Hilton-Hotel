import nodemailer from 'nodemailer';
import Joi from 'joi';
import { createToken } from '../utilities/token.js';
import prisma from '../models/prisma/prisma-client.js';
import { AdminDao } from '../models/dao/admin.dao.js';


export class EmailController {
  static sendEmailConfirmation = async (req, res) => {
    const email = req.body.email;
    let schema;
    let user;

    if (type === 'CREATE') {
      schema = Joi.object({
        email: Joi.string().email().required(),
      });
    }

    try {
      if (type === 'CREATE') {
        const { error } = schema.validate({ email });
        if (error) return res.status(400).json({ error: 'Email is not valid' });
      }

      user = await prisma.user.findUnique({
        where: {
          email: email,
          isDeleted: false,
        },
      });

      if (!user) {
        user = await prisma.admin.findUnique({
          where: {
            email: email,
            isDeleted: false,
          },
        });
        if (!user) return res.status(404).json({ error: 'User is not found' });
      }
      await this.sendEmail(user, 'CONFIRM');
    } catch (e) {
      console.error('error from send confirmation mail : ', e.message);
      return res.status(500).json({ error: 'Error from Send Email Confirmation!' });
    }
  };


  static sendEmail = async (userObj, type = 'CONFIRM' | 'RESET') => {
    try {
      const token = createToken(userObj, '15m');
      let confirmToken;

      if (type === 'CONFIRM') {
        if (userObj.role === 'ADMIN') {
          confirmToken = await prisma.confirmToken.create({
            data: {
              token,
              adminId: userObj.id,
              expireAt: new Date(Date.now() + 15 * 60 * 1000),
            },
          });
        } else {
          confirmToken = await prisma.confirmToken.create({
            data: {
              token,
              userId: userObj.id,
              expireAt: new Date(Date.now() + 15 * 60 * 1000),
            },
          });
        }
      } // TODO (type === 'CONFIRM')

      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.APP_EMAIL,
          pass: process.env.APP_PASSWORD,
        },
      });

      const url = type === 'CONFIRM' ?
        userObj.role === 'ADMIN' ?
          `http://localhost:3000/api/v1/auth/admin/email/${userObj.id}/${token}` :
          `http://localhost:3000/api/v1/auth/user/email/${userObj.id}/${token}` :
        ``; // TODO

      const info = await transporter.sendMail({
        from: process.env.APP_EMAIL,
        to: userObj.email,
        subject: type === 'CONFIRM' ? 'Email Confirmation' : 'Reset Password Confirmation',
        html: type === 'CONFIRM' ?
          `<div>
            <h2> Email Confirmation </h2>
            <h4>Dear ${userObj.userName}</h4>,
            <p> 
              Thank you for registering on our Hilton website! We are delighted to welcome you
              to our small family. Please click on the following link to confirm your email:
              <br>
              <b>If you have not registered or believe this email was sent by mistake, please disregard it.</b> 
              <br>
              URL: ${url} 
              <br>
              Note: This link will be valid for 15 minutes from the time of receipt.
            </p>
          </div>` :
          ``, // TODO
      });

      await transporter.sendMail(info, (err, data) => {
        if (err) console.error(err);
      });
    } catch (e) {
      throw new Error('Error from Send Email', e.message);
    }
  };

  static AdminConfirmation = async (req, res) => {
    const { adminId, token } = req.params;
    try {
      const admin = await prisma.admin.findUnique({
        where: {
          id: adminId,
        }, include: {
          ConfirmToken: true,
        },
      });

      if (!admin) throw new Error('Admin not found');
      if (!admin.ConfirmToken) throw new Error('Token not found');
      if (admin.ConfirmToken.expireAt < new Date()) throw new Error('Token has expired');
      if (admin.ConfirmToken.token !== token) throw new Error('Token is not valid');
      if (admin.emailConfirmed) throw new Error('Email is already confirmed');

      const adminDao = new AdminDao();
      const updatedAdmin = await adminDao.updateAdmin({
        id: admin.id,
        emailConfirmed: true,
      });

      return res.status(200).json({
        data: updatedAdmin,
        status: 'Email confirmed successfully',
      });
    } catch (error) {
      console.error(error.message);
      return res.status(500).json({ error: error.message });
    }
  };
}
