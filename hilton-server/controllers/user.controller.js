import { UserDao } from '../models/dao/user.dao.js';
import { UserDto } from '../models/dto/user.dto.js';
import { UserValidate } from '../middlewares/validations/user.validate.js';
import { hashPassword } from '../utilities/password.js';
import { EmailController } from './email.controller.js';
import { validateUserId } from '../utilities/Id_validations/users.id.validation.js';
import fs from 'fs';
import path from 'path';
import { createToken } from '../utilities/token.js';
export class UserController {
  static createUser = async (req, res) => {
    try {
      req.body.password = await hashPassword(req.body.password);
      req.body.birthDate = new Date(req.body.birthDate);

      if (req.file) req.body.profilePic = req.file.path;
      const userDto = new UserDto(req.body);
      const userDao = new UserDao();

      const { error } = await UserValidate.createUser(userDto);
      if (error) return res.status(400).json({ message: error.details[0].message });

      const user = await userDao.createUser(userDto);
      await EmailController.sendEmailConfirmation(req, res, 'CONFIRM');

      const token = createToken(user, '3d');
      res.setHeader('token', `Bearer ${token}`);
      req.user = {
        id: user.id,
        email: user.email,
        username: user.username,
        role: user.role,
        isDeleted: user.isDeleted,
      };
      return res.status(200).json({
        message: 'User created successfully',
        data: user,
      });
    } catch (e) {
      console.error(e);
      return res.status(500).json({ error: e.message || 'Internal server error' });
    }
  };

  static getAllUsers = async (req, res) => {
    const userDao = new UserDao();

    try {
      const users = await userDao.getAllUsers();
      return res
        .status(200)
        .json({
          message: 'Users retrieved successfully',
          data: users,
        });
    } catch (e) {
      return res.status(500).json({ error: e.message || 'Eternal server error' });
    }
  };

  static getUserById = async (req, res) => {
    const userDao = new UserDao();
    try {
      const user = await userDao.getUserById(req.params.userId);
      return res
        .status(200)
        .json({
          message: 'User retrieved successfully',
          data: user,
        });
    } catch (e) {
      if (typeof e === 'object' && e.message && e.message.includes('User')) {
        return res
          .status(404)
          .json({ error: 'User not found' });
      }
    }
  };

  static updateUser = async (req, res) => {
    const userDto = new UserDto(req.body);
    userDto.id = req.params.userId;
    const userDao = new UserDao();

    if (req.file) userDto.profilePic = req.file.path;
    try {

      const user = await userDao.getUserById(userDto.id);

      if (user.profilePic && userDto.profilePic) {
        if (fs.existsSync(path.join(__dirname, `../uploads/${user.profilePic}`))) {
            fs.unlinkSync(path.join(__dirname, `../uploads/${user.profilePic}`));
      }
    }


      const { error } = await UserValidate.updateUser(userDto);
      if (error) return res.status(400).json({ message: error.details[0].message });

      const updatedUser = await userDao.updateUser(userDto);
      if (req.body.email) await EmailController.sendEmailConfirmation(req, res, 'CONFIRM');

      return res
        .status(200)
        .json({
          message: 'User updated successfully',
          data: updatedUser,
        });
    } catch (e) {
      if (typeof e === 'object' && e.message && e.message.includes('Email')) {
        return res.status(500).json({ error: 'Email is already in use!' });
      } else if (typeof e === 'object' && e.message && e.message.includes('Phone')) {
        return res.status(500).json({ error: 'Phone number is already in use!' });
      } else {
        return res.status(500).json({ error: e.message || 'Eternal server error' });
      }
    }
  };

  static softDeleteUser = async (req, res) => {
    const userId = req.params.userId;
    const userDao = new UserDao();

    try {

      await validateUserId(userId);

      const deletedUser = await userDao.softDeleteUser(userId);
      return res
        .status(200)
        .json({
          message: 'User deleted (softly) Successfully',
          data: deletedUser,
        });
    } catch (e) {
      if (typeof e === 'object' && e.message && e.message.includes('User')) {
        return res
          .status(404)
          .json({ error: 'User not found' });
      }
      return res.status(500).json({ error: e.message || 'Eternal server error' });
    }
  };

  static hardDeleteUser = async (req, res) => {
    const userId = req.params.userId;
    const userDao = new UserDao();

    try {

      await validateUserId(userId);

      const deletedUser = await userDao.hardDeleteUser(userId);
      return res
        .status(200)
        .json({
          message: 'User deleted permentaly Successfully',
          data: deletedUser,
        });
    } catch (e) {
      if (typeof e === 'object' && e.message && e.message.includes('User')) {
        return res
          .status(404)
          .json({ error: 'User not found' });
      }
      return res.status(500).json({ error: e.message || 'Eternal server error' });
    }
  };
}
