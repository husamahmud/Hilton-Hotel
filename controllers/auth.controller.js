import prisma from '../models/prisma/prisma-client.js';
import { AuthDao } from '../models/dao/auth.dao.js';
import { LoginDto } from '../models/dto/login.dto.js';
import { AuthValidate } from '../middlewares/validations/auth.validate.js';
import { AdminDao } from '../models/dao/admin.dao.js';
import { UserDao } from '../models/dao/user.dao.js';
import { createToken } from '../utilities/token.js';
import { EmailController } from './email.controller.js';

export class AuthController {
  static login = async (req, res) => {
    try {
      const loginDto = new LoginDto(req.body);
      const { error } = await AuthValidate.login(loginDto);
      if (error) return res.status(400).json({ message: error.details[0].message });

      const user = await AuthDao.login(loginDto);
      const token = createToken(user, '3d');

      if (req.body.isRemember) {
        await prisma.RefreshToken.create({
          data: {
            token: createToken(user, '5d'),
            userId: user.id,
            expireAt: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
          },
        });
      }

      return res.status(200).json({
        message: 'User Logged in successfully',
        data: user,
        token,
      });
    } catch (e) {
      console.error(e);
      return res.status(500).json({ error: e.message || 'Internal server error' });
    }
  };

  static forgetPassword = async (req, res) => {
    try {
      const user = await prisma.user.findUnique({
        where: {
          email: req.body.email,
        },
      });
      let admin;
      if (!user) {
        admin = await prisma.admin.findUnique({
          where: {
            email: req.body.email,
          },
        });
        if (!admin) return res.status(404).json({ message: 'User not found, please register' });
      }
      await EmailController.sendEmailConfirmation(req, res, 'RESET');
      return res.status(200).json({ message: 'Email sent successfully' });
    } catch (e) {
      console.error(e);
      return res.status(500).json({ error: e.message || 'Internal server error' });
    }
  };

  static resetPassword = async (req, res) => {
    const { userId, token } = req.params;
    const adminDao = new AdminDao();
    const userDao = new UserDao();
    if (req.body.password !== req.body.confirmPassword) return res.status(400).json({ message: 'Passwords do not match' });
    try {

      const user = await userDao.getUserById(userId);
      if (!user) {
        let admin = await adminDao.findAdminById(userId);
        if (!admin) return res.status(404).json({ message: 'User not found' });
      }

      if (user) {
        const resetToken = await prisma.resetToken.findUnique({
          where: {
            userId,
          },
        });
        if (!resetToken) throw new Error('Token is not found');
        if (resetToken.expireAt < new Date()) throw new Error('Token has expired');
        if (resetToken.token !== token) throw new Error('Invalid token');

        const updatedUser = await userDao.updateUser({
          id: userId,
          password: req.body.password,
        });

        return res.status(200).json({
          message: 'Password updated successfully',
          data: updatedUser,
        });
      }

      if (admin) {
        const resetToken = await prisma.resetToken.findUnique({
          where: {
            adminId: userId,
          },
        });
        if (!resetToken) throw new Error('Token is not found');
        if (resetToken.expireAt < new Date()) throw new Error('Token has expired');
        if (resetToken.token !== token) throw new Error('Invalid token');

        const updatedAdmin = await adminDao.updateAdmin({
          id: userId,
          password: req.body.password,
        });
        return res.status(200).json({
          message: 'Password updated successfully',
          data: updatedAdmin,
        });
      }
    } catch (e) {
      console.error(e);
      return res.status(500).json({ error: e.message || 'Internal server error' });
    }
  };
}
