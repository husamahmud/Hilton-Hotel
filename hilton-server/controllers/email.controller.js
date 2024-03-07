import nodemailer from 'nodemailer';
import Joi from 'joi';
import prisma from '../models/prisma/prisma-client.js';
import { createToken } from '../utilities/token.js';
import client from "../app.js"
export class EmailController {
  static sendEmailConfirmation = async (req, res, type) => {
    const email = req.body.email;
    if (email) {
      const schema = Joi.object({
        email: Joi.string().email().required(),
      });
      const { error } = await schema.validate({ email });
      if (error) return res.status(400).json({ error: 'Email is not valid' });
      var userObj;
      if (!req.params.userId) {
        userObj = await prisma.user.findUnique({
          where: {
            email,
          },
        });
        if (!userObj) {
          userObj = await prisma.admin.findUnique({
            where: {
              email,
            },
          });
          if (!userObj) return res.status(404).json({ error: 'Admin is not found' });
        }
      }
      if (req.params.userId) {
        userObj = await prisma.user.findUnique({
          where: {
            id: req.params.userId,
          },
        });
        if (!userObj) return res.status(400).json({ error: 'User is not found' });
      }
    }
    let resetCode = Math.floor(100000 + Math.random() * 900000);
    const userId = userObj.id;
    let token = createToken(userObj, '15m');
    if (type === 'CONFIRM') {
      if (userObj.role === 'ADMIN') {
        await prisma.confirmToken.create({
          data: {
            token,
            adminId: userId,
            expireAt: new Date(Date.now() + 15 * 60 * 1000),
          },
        });
      } else {
        await prisma.confirmToken.create({
          data: {
            token,
            userId: userId,
            expireAt: new Date(Date.now() + 15 * 60 * 1000),
          },
        });
      }
    } else if (type === 'RESET') {
      await client.set(`resetCode:${userObj.id}`,resetCode);
    }

    let endpoint;
    const baseUrl = 'http://localhost:3000/api/v1/auth/';
    if (type === 'CONFIRM') {
      if (userObj.role === 'ADMIN') endpoint = 'admin/email'; else endpoint = 'user/email';
    } else if (type === 'RESET') {
      endpoint = 'password/reset';
    }
    let url = `${baseUrl}${endpoint}/${userId}/${token}`;

    try {
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.APP_EMAIL,
          pass: process.env.APP_PASSWORD,
        },
      });
      const info = await transporter.sendMail({
        from: process.env.APP_EMAIL,
        to: userObj.email,
        subject: type === 'CONFIRM' ? 'Email Confirmation' : 'Reset Password Confirmation',
        html: type === 'CONFIRM' ?
          `<div>
            <h4>Dear ${userObj.username}</h4>,
            <p>
              Thank you for registering on our Hilton website! We are delighted to welcome you
              to our small family. Please click on the following link to confirm your email:
              <br>
              URL: ${url}
              <br>
              Note: This link will be valid for 15 minutes from the time of receipt.
              <br>
              <b>If you have not registered or believe this email was sent by mistake, please disregard it.</b>
            </p>
          </div>` :
          `<div>
            <h4>Dear ${userObj.username}</h4>,
            <p>
              Hope This mail finds you will, You can use this code to reset your password:
              <br>
              code: ${resetCode}
              <br>
              <b>If you have not asked for resetting password or believe this email was sent by mistake, please disregard it.</b>
            </p>
          </div>`,
      });
      console.log('Email sent successfully');
    } catch (e) {
      throw new Error('Error from Send Email ' + e.message);
    }
  };

  static UserConfirmation = async (req, res) => {
    const { userId, token } = req.params;
    try {
      const user = await prisma.user.findUnique({
        where: { id: userId }, include: { ConfirmToken: true },
      });

      if (!user) throw new Error('User is not found');
      if (!user.ConfirmToken) throw new Error('Token not found');
      if (user.ConfirmToken.expireAt < new Date()) throw new Error('Token has expired');
      if (user.ConfirmToken.token !== token) throw new Error('Invalid token');
      if (user.emailConfirmed) throw new Error('Email is already confirmed');

      const updatedUser = await prisma.user.update({
        where: {
          id: userId,
        }, data: {
          emailConfirmed: true,
        },
      });

      await prisma.confirmToken.delete({
        where: {
          userId,
        },
      });

      return res.send(`
      <script>
          window.location.href = 'http://localhost:3001/';
      </script>
  `)
    } catch (e) {
      throw new Error('Error from UserConfirmation ' + e.message);
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

      const updatedAdmin = await prisma.admin.update({
        where: {
          id: adminId,
        }, data: {
          emailConfirmed: true,
        },
      });

      return res.send(`
                <script>
                    window.location.href = 'http://localhost:3001/';
                </script>
            `)
    } catch (error) {
      console.error(error.message);
      return res.status(500).json({ error: error.message });
    }
  };
};
