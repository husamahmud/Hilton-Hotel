import prisma from '../prisma/prisma-client.js';
import { hashPassword } from '../../utilities/password.js';
import { AdminDao } from './admin.dao.js';

export class UserDao {
  isExisted = async (element, field) => {
    let query;
    if (field === 'email') query = { where: { email: element } }; else if (field === 'nationalID') query = { where: { nationalID: element } }; else if (field === 'username') query = { where: { username: element } };

    const existingUser = await prisma.user.findUnique(query);
    if (existingUser) {
      throw new Error(`${field === 'email' ? 'Email' : field === 'username' ? 'Username' : 'National ID'} is already in use!`);
    }
  };

  createUser = async (userDto) => {
    await this.isExisted(userDto.email, 'email');
    await this.isExisted(userDto.nationalID, 'nationalID');
    await this.isExisted(userDto.username, 'username');

    const today = new Date();
    const birthDate = new Date(userDto.birthDate);
    const age = today.getFullYear() - birthDate.getFullYear();
    if (age < 18) throw new Error('You must be at least 18 years old');

    const newUser = await prisma.user.create({
      data: userDto,
    });
    return newUser;
  };


  getAllUsers = async () => {
    const users = await prisma.user.findMany({
      where: {
        isDeleted: false,
      },
    });
    return users;
  };

  getUserById = async (userId) => {
    const user = prisma.user.findUnique({
      where: {
        id: userId, isDeleted: false,
      },
    });
    if (!user) throw new Error('User is not found');
    return user;
  };

  updateUser = async (userDto) => {
    let updatedUser;
    let updatedUserEmail;

    if (userDto.email) {
      await this.isExisted(userDto.email, 'email');
      await new AdminDao().isExisted(userDto.email, 'email');
      userDto.emailConfirmed = false;
      updatedUserEmail = await prisma.user.update({
        where: {
          id: userDto.id,
        }, data: userDto,
      });
    }

    if (userDto.phoneNum) await this.isExisted(userDto.phoneNum, 'phoneNum');
    if (userDto.username) await this.isExisted(userDto.username, 'username');
    if (userDto.birthDate) userDto.birthDate = new Date(userDto.birthDate);
    if (userDto.password) userDto.password = await hashPassword(userDto.password);

    updatedUser = await prisma.user.update({
      where: {
        id: userDto.id,
      }, data: userDto,
    });
    return updatedUser || updatedUserEmail;
  };

  softDeleteUser = async (userId) => {
    await this.getUserById(userId);
    const deletedUser = await prisma.user.update({
      where: {
        id: userId,
      }, data: {
        isDeleted: true,
      },
    });
    return deletedUser;
  };

  hardDeleteUser = async (userId) => {
    await this.getUserById(userId);
    const deletedUser = await prisma.user.delete({
      where: {
        id: userId,
      },
    });
    return deletedUser;
  };
}
