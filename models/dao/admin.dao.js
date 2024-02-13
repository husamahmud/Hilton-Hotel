import prisma from '../prisma/prisma-client.js';

export class AdminDao {
  isExisted = async (element, field) => {
    let query;
    if (field === 'email') query = { where: { email: element } };
    else if (field === 'phoneNum') query = { where: { phoneNum: element } };
    else if (field === 'username') query = { where: { username: element } };

    const existingUser = await prisma.admin.findUnique(query);
    if (existingUser) {
      throw new Error(`${field === 'email' ? 'Email' : field === 'username' ? 'Username' : 'Phone number'} is already in use!`);
    }
  };

  createAdmin = async (adminDto) => {
    await this.isExisted(adminDto.email);
    await this.isExisted(adminDto.phoneNum);

    const newAdmin = await prisma.admin.create({
      data: adminDto,
    });
    return newAdmin;
  };

  getAllAdmins = async () => {
    const admins = await prisma.admin.findMany({
      where: {
        isDeleted: false,
      },
    });
    return admins;
  };

  getAdminById = async (adminId) => {
    const admin = prisma.admin.findUnique({
      where: {
        id: adminId,
        isDeleted: false,
      },
    });
    if (!admin) throw new Error('Admin is not found');
    return admin;
  };

  updateAdmin = async (adminDto) => {
    await this.getAdminById(adminDto.id);
    if (adminDto.email) await this.isExisted(adminDto.email, 'email');
    if (adminDto.phoneNum) await this.isExisted(adminDto.phoneNum, 'phoneNum');
    if (adminDto.birthDate) adminDto.birthDate = new Date(adminDto.birthDate);
    if (adminDto.password) adminDto.password = await hashPassword(adminDto.password);
    if (adminDto.username) await this.isExisted(adminDto.username, 'username');

    const updatedAdmin = await prisma.admin.update({
      where: {
        id: adminDto.id,
        isDeleted: false,
      },
      data: adminDto,
    });

    return updatedAdmin;
  };

  softDeleteAdmin = async (adminId) => {
    await this.getAdminById(adminId);

    const deletedAdmin = await prisma.admin.update({
      where: {
        id: adminId,
      },
      data: {
        isDeleted: true,
      },
    });

    return deletedAdmin;
  };

  hardDeleteAdmin = async (adminId) => {
    this.getAdminById(adminId);
    const deletedAdmin = await prisma.admin.delete({
      where: {
        id: adminId,
      },
    });
    return deletedAdmin;
  };
}