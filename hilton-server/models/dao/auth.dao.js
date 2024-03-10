import prisma from '../prisma/prisma-client.js';
import { comparePasswords } from '../../utilities/password.js';

export class AuthDao {

  login = async (userDto) => {
    let user;
    let admin;

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
    }

    if (!user && !admin) {
      throw new Error('User is not found');
    }

    const target = user || admin;
    const isPasswordMatch = comparePasswords(userDto.password, target.password);

    if (!isPasswordMatch) {
      throw new Error('Password is not correct');
    }

    return target;
  };
}

