import prisma from '../prisma/prisma-client.js';
import { hashPassword } from '../../utilities/password.js';

export class UserDao {
  static isExisted = async (element, field) => {
    let query;
    if (field === 'email') query = { where: { email: element } };
    else if (field === 'phoneNum') query = { where: { phoneNum: element } };
    else if (field === 'username') query = { where: { username: element } };

    const existingUser = await prisma.user.findUnique(query);
    if (existingUser) {
      throw new Error(`${field === 'email' ? 'Email' : field === 'username' ? 'Username' : 'Phone number'} is already in use!`);
    }
  };

  createUser = async (userDto) => {
    await this.isExisted(userDto.email, 'email');
    const newUser = await prisma.user.create({
      data: userDto,
    });
    return newUser;
  };

  getUserById = async (userId) => {
    const user = prisma.user.findUnique({
      where: {
        id: userId,
        isDeleted: false,
      },
    });
    if (!user) throw new Error('User is not found');
    return user;
  };

  updateUser = async (userDto) => {
    if (userDto.password) userDto.password = await hashPassword(userDto.password);
    if (userDto.email) await this.isExisted(userDto.email);
    if (userDto.phoneNum) await this.isExisted(userDto.phoneNum);
    if (userDto.username) await this.isExisted(userDto.username);
    if (userDto.birthDate) userDto.birthDate = new Date(userDto.birthDate);

    const updatedUser = await prisma.user.update({
      where: {
        id: userDto.id,
      },
      data: userDto,
    });
    return updatedUser;
  };
}
