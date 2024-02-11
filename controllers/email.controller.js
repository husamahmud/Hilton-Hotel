import nodemailer from 'nodemailer';
import Joi from 'joi';
import { createToken } from '../utilities/token.js';
import prisma from '../models/prisma/prisma-client.js';


export class EmailController {

  static sendEmailConfirmation = async (req, res) => {
    const email = req.body.email;
    let user;

    const schema = Joi.object({
      email: Joi.string().email().required(),
    });

    try {
      const { error } = await schema.validate({ email });
      if (error) return res.status(400).json({ error: 'Email is not valid' });

      user = await prisma.user.findUnique({
        where: {
          email: email,
          isDelted: false,
        },
      });

      if (!user) {
        user = await prisma.admin.findUnique({
          where: {
            email: email,
            isDeleted: false,
          },
        });
        if (!user) return res.status(404).json({ error: 'Email is not found' });
        //! admin
        await this.sendEmail(user, 'CONFIRM');
        res.status(200).json({ message: 'email sent', data: user });
      }
      //! user
      await this.sendEmail(user, 'CONFIRM');
      res.status(200).json({ message: 'email sent', data: user });
    } catch (e) {
      console.log('error from send confirmation mail : ', e.message);
      res.status(500).json({ error: e.message });
    }
  };

  static sendEmail = async (userObj, type = 'CONFIRM' | 'RESET') => {
    console.log('userObj : ', userObj);
    try {
      const token = await createToken(userObj, '15m');
      console.log('token   :', token);

      let confirmToken;
      if (type === 'CONFIRM') {
        console.log('type from if  :', type);
        if (userObj.role === 'ADMIN') {
          console.log('role from if  :' , userObj.role);
          confirmToken = await prisma.confirmToken.create({
            data: {
              token,
              adminId: userObj.id,
              expireAt: new Date(Date.now() + 15 * 60 * 1000),
            },
          });
          console.log('confim zeft mn el if :', confirmToken);
        } else {
          confirmToken = await prisma.confirmToken.create({
            data: {
              token,
              userId: userObj.id,
              expireAt: new Date(Date.now() + 15 * 60 * 1000),
            },
          });

        }
        console.log('confirm token ', confirmToken);
      } // TODO type === reset

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
          `http://localhost:3000/api/v1/auth/user/email/${userObj.id}/${token}`
        : ''; // TODO


      const info = await transporter.sendMail({
        from: process.env.APP_EMAIL,
        to: userObj.email,
        subject: type === 'CONFIRM' ? 'Email Confirmation' : 'Reset Password Confirmation',
        html: type === 'CONFIRM' ? `<div> 
        <h2> Email Confirmation </h2>
        <h4>
        Dear ${userObj.username} </h4>, 
        <p> You have registered to our Hilton website!, 
        We are glad to have you in our small family! please follow this link to
        confirm this email pleas <br>
        <b>if you haven't registered or think there's a mistake, please ignore this email</b> <br>
         URL : ${url} <br> P.S.: this link is valid for 15mins once you receive it.</p>
        </div>` : '', // TODO
      });

      await transporter.sendMail(info, (err, data) => {
        if (err) {
          console.log(err);
        } else {
          console.log('email sent');
        }
      });
    } catch (e) {
      throw new Error('Error from Send Email', e.details[0].message);
    }

    // confirmation
    // token type
    // reset password
    // user / admin
    // => type el email
    // => who i want to send to

  };
}

// async function main() {
//   // send mail with defined transport object
//   const info = await transporter.sendMail({
//     from: '"Fred Foo 👻" <foo@example.com>', // sender address
//     to: "bar@example.com, baz@example.com", // list of receivers
//     subject: "Hello ✔", // Subject line
//     text: "Hello world?", // plain text body
//     html: "<b>Hello world?</b>", // html body
//   });
//
//   console.log("Message sent: %s", info.messageId);
// }
