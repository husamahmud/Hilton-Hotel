import prisma from '../prisma/prisma-client.js';
import { comparePasswords } from '../../utilities/password.js';

export class AuthDao {
  static login = async (userDto) => {
    let user;
    if (userDto.email) {
      user = await prisma.user.findUnique({
        where: {
          email: userDto.email,
        },
      });
    } else if (userDto.username) {
      user = await prisma.user.findUnique({
        where: {
          username: userDto.username,
        },
      });
    }
    let isPasswordMatch;
    let admin;
    if (!user) {
      if (userDto.email) {
        admin = await prisma.admin.findUnique({
          where: {
            email: userDto.email,
          },
        });
      } else if (userDto.username) {
        admin = await prisma.admin.findUnique({
          where: {
            username: userDto.username,
          },
        });
      }
      if (!admin) throw new Error('User is not found');
      else isPasswordMatch = await comparePasswords(userDto.password, admin.password);
    } else {
      isPasswordMatch = await comparePasswords(userDto.password, user.password);
    }

    if (!isPasswordMatch) throw new Error('Password is not correct');
    return user || admin;
  };
}
