import prisma from '../models/prisma/prisma-client.js';
import {AuthDao} from '../models/dao/auth.dao.js';
import {LoginDto} from '../models/dto/login.dto.js';
import {AuthValidate} from '../middlewares/validations/auth.validate.js';
import {AdminDao} from '../models/dao/admin.dao.js';
import {UserDao} from '../models/dao/user.dao.js';
import {createToken} from '../utilities/token.js';
import {EmailController} from './email.controller.js';
import {hashPassword} from '../utilities/password.js';

import client from '../app.js';

export class AuthController {
	static login = async (req, res) => {
		const loginDto = new LoginDto(req.body);
		const authDao = new AuthDao()
		console.log(loginDto)
		try {
			const {error} = await AuthValidate.login(loginDto);
			if (error) return res.status(400).json({message: error.details[0].message});

			const user = await authDao.login(loginDto);
			const token = createToken(user, '3d');

			if (req.body.isRemember) {
				const refreshToken = await prisma.refreshToken.create({
					data: {
						token: createToken(user, '5d'),
						userId: user.id,
						expireAt: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
					},
				});
				res.setHeader('refreshToken', `Bearer ${refreshToken}`)
			}

			req.user = {
				id: user.id,
				email: user.email,
				username: user.username,
				role: user.role,
			};

			res.setHeader('token', `Bearer ${token}`);

			return res.status(200).json({
				message: 'User Logged in successfully',
				data: user,
				token,
			});
		} catch (e) {
			console.error(e);
			return res.status(500).json({error: e.message || 'Internal server error'});
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
				if (!admin) return res.status(404).json({message: 'User not found, please register'});
			}
			await EmailController.sendEmailConfirmation(req, res, 'RESET');
			return res.status(200).json({message: 'Email sent successfully'});
		} catch (e) {
			console.error(e);
			return res.status(500).json({error: e.message || 'Internal server error'});
		}
	};


	static verifyCode = async (req, res) => {
		const resetCode = req.body.resetCode;
		const email = req.body.email;

		console.log('resetCode', resetCode);

		let admin;
		let user;
		if (!resetCode) return res.status(400).json({message: 'Reset code is required'});

		let userId;
		try {
			user = await prisma.user.findUnique({
				where: {
					email,
				},
			});
			if (!user) {
				admin = await prisma.admin.findUnique({
					where: {
						email,
					},
				});
				if (!admin) return res.status(404).json({message: 'User not found'});
				userId = admin.id;
			}
			else {
				userId = user.id;
			}

			const code = await client.get(`resetCode:${userId}`);

			console.log('code', code);
			if (!code) return res.status(400).json({message: 'Reset code has expired'});
			if (code !== resetCode) return res.status(400).json({message: 'Invalid reset code'});

			return res.status(200).json({message: 'Reset code verified successfully', user: user || admin});
		} catch (e) {
			console.error(e);
			return res.status(500).json({error: e.message || 'Internal server error'});
		}
	}

	static resetPassword = async (req, res) => {
		const userId = req.params.userId; // TODO when redirecting  include userId from response
		const adminDao = new AdminDao();
		const userDao = new UserDao();
		if (req.body.password !== req.body.confirmPassword) return res.status(400).json({message: 'Passwords do not match'});
		try {
			const user = await userDao.getUserById(userId);
			let admin;
			if (!user) {
				admin = await adminDao.getAdminById(userId);
				if (!admin) return res.status(404).json({message: 'User not found'});
			}
			if (user) {
				const hashed = await hashPassword(req.body.password);
				console.log('body pass ', req.body.password)
				console.log('hashed ', hashed)
				const updatedUser = await userDao.updateUser({
					id: userId,
					password: hashed,
				});

				return res.status(200).json({
					message: 'Password updated successfully',
					data: updatedUser,
				});
			}

			if (admin) {
				const hashed = await hashPassword(req.body.password);
				const updatedAdmin = await adminDao.updateAdmin({
					id: userId,
					password: hashed,
				});
				return res.status(200).json({
					message: 'Password updated successfully',
					data: updatedAdmin,
				});
			}
		} catch (e) {
			console.error(e);
			return res.status(500).json({error: e.message || 'Internal server error'});
		}
	};

	static chagnePassword = async (req, res) => {
		try {
			const user = await prisma.user.findUnique({
				where: {
					id: req.params.userId,
				},
			});
			if (!user) return res.status(404).json({message: 'User not found'});

			if (req.body.password !== req.body.confirmPassword) return res.status(400).json({message: 'Passwords do not match'});

			const hashed = await hashPassword(req.body.password);
			const updatedUser = await prisma.user.update({
				where: {
					id: req.params.userId,
				},
				data: {
					password: hashed,
				},
			});

			return res.status(200).json({
				message: 'Password updated successfully',
				data: updatedUser,
			});
		} catch (e) {
			console.error(e);
			return res.status(500).json({error: e.message || 'Internal server error'});
		}
	};
}
