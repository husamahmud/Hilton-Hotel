import prisma from '../prisma/prisma-client.js';

export class UserDao {
  isExisted = async (element) => {
    let field, query;

    if (element.includes('@')) {
      field = 'email';
      query = { where: { email: element } };
    } else {
      field = 'phoneNum';
      query = { where: { phoneNum: element } };
    }

    const existingUser = await prisma.user.findUnique(query);
    if (existingUser) {
      throw new Error(`${field === 'email' ? 'Email' : 'Phone number'} is already in use!`);
    }
  };

  createUser = async (userDto) => {
    await this.isExisted(userDto.email);
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
}
