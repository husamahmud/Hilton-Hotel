import { AdminDao } from '../models/dao/admin.dao.js';
import { AdminDto } from '../models/dto/admin.dto.js';
import { AdminValidation } from '../middlewares/validations/admin.validate.js';
import { hashPassword } from '../utilities/password.js';
import { EmailController } from './email.controller.js';
import { validateAdminId } from '../utilities/Id_validations/users.id.validation.js';
import fs from 'fs';
import path from 'path';
import { createToken } from '../utilities/token.js';

export class AdminController {
  static createAdmin = async (req, res) => {
    req.body.password = await hashPassword(req.body.password);
    req.body.birthDate = new Date(req.body.birthDate);
    if (req.file) req.body.profilePic = req.file.path;

    const adminDto = new AdminDto(req.body);
    const adminDao = new AdminDao();

    console.log(adminDto)
    try {
      const { error } = await AdminValidation.createAdmin(adminDto);
      if (error) return res.status(400).json({ message: error.details[0].message });

      const admin = await adminDao.createAdmin(adminDto);
      await EmailController.sendEmailConfirmation(req, res, 'CONFIRM');

       req.user = {
        id: admin.id,
        email: admin.email,
        username: admin.username,
        role: admin.role,
        isDeleted: admin.isDeleted,
      };
      
      const token = createToken(admin, '3d');
      res.setHeader('token', `Bearer ${token}`);
      return res.status(200).json({
        message: 'Email Sent and Admin created Successfully ', data: admin,
      });
    } catch (e) {
      console.log(e)
      return res.status(500).json({ error: e.message || 'Internal server error' });
    }
  };

  static getAllAdmins = async (req, res) => {
    const adminDao = new AdminDao();

    try {
      const admins = await adminDao.getAllAdmins();
      return res
        .status(200)
        .json({
          message: 'Admins retrieved successfully', data: admins,
        });
    } catch (e) {
      return res.status(500).json({ error: e.message || 'Eternal server error' });
    }
  };

  static getAdminById = async (req, res) => {
    const adminDao = new AdminDao();
    const adminId = req.params.adminId;

    try {
      const admin = await adminDao.getAdminById(adminId);
      return res
        .status(200)
        .json({ message: 'Amind retrieved successfully', data: admin });
    } catch (e) {
      if (typeof e === 'object' && e.message && e.message.includes('Admin')) {
        return res
          .status(404)
          .json({ error: 'Admin not found' });
      }
      return res.status(500).json({ error: e.message || 'Eternal server error' });
    }
  };

  static updateAdmin = async (req, res) => {
    const adminDto = new AdminDto(req.body);
    adminDto.id = req.params.adminId;
    const adminDao = new AdminDao();
    try {

     // check if uploaded file exists in db and delete it from upload dir
     const admin = await adminDao.getAdminById(adminDto.id);
     if (adminDto.profilePic && req.file) {
        if (fs.existsSync(path.join(__dirname, `../uploads/${admin.profilePic}`))) {
          fs.unlinkSync(path.join(__dirname, `../uploads/${admin.profilePic}`));
        };
      }

      if (req.file) adminDto.profilePic = req.file.path;


      const { error } = await AdminValidation.updateAdmin(adminDto);
      if (error) return res.status(400).json({ error: error.message });

      const updatedAdmin = await adminDao.updateAdmin(adminDto);
      if (req.body.email) await EmailController.sendEmailConfirmation(req, res, 'CONFIRM');

      return res
        .status(200)
        .json({ message: 'Admin updated successfully', data: updatedAdmin });
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

  static softDeleteAdmin = async (req, res) => {
    const adminId = req.params.adminId;
    const adminDao = new AdminDao();

    try {

      await validateAdminId(adminId);

      const deletedAdmin = await adminDao.softDeleteAdmin(adminId);
      return res
        .status(200)
        .json({
          message: 'Admin deleted (softly) Successfully', data: deletedAdmin,
        });
    } catch (e) {
      if (typeof e === 'object' && e.message && e.message.includes('Admin')) {
        return res
          .status(404)
          .json({ error: 'Admin not found' });
      }
      return res.status(500).json({ error: e.message || 'Eternal server error' });
    }
  };

  static hardDeleteAdmin = async (req, res) => {
    const adminId = req.params.adminId;
    const adminDao = new AdminDao();

    try {

      await validateAdminId(adminId);

      const deletedAdmin = await adminDao.hardDeleteAdmin(adminId);
      return res
        .status(200)
        .json({
          message: 'Admin deleted permentaly Successfully', data: deletedAdmin,
        });
    } catch (e) {
      if (typeof e === 'object' && e.message && e.message.includes('Admin')) {
        return res
          .status(404)
          .json({ error: 'Admin not found' });
      }
      return res.status(500).json({ error: e.message || 'Eternal server error' });
    }
  };
}
