import prisma from '../prisma/prisma-client.js';

export class AdminDao {
	isExisted = async (element) => {
		let isExisted, searched;
		if (element.includes('@')) {
			searched = 'Email';
			isExisted = await prisma.admin.findUnique({
				where: {
					email: element
				}
			})
		} else {
			searched = 'Phone number';
			isExisted = await prisma.admin.findUnique({
				where: {
					phoneNum: element
				}
			})
		}
		if (isExisted) {
			throw new Error(`${searched} is already in use!`)
		}
	}

	createAdmin = async (adminDto) => {
		this.isExisted(adminDto.email)

		this.isExisted(adminDto.phoneNum)

		const newAdmin = await prisma.admin.create({
			data: adminDto
		})

		return newAdmin
	}

	getAllAdmins = async () => {
		const admins = await prisma.admin.findMany({
			where: {
				isDeleted: false
			}
		})

		return admins
	}

	getAdminById = async (adminId) => {
		const admin = prisma.admin.findUnique({
			where: {
				id: adminId,
				isDeleted: false
			}
		})

		if (!admin) {
			throw new Error('Admin is not found')
		}

		return admin
	}

	updateAdmin = async (adminDto) => {
		await this.getAdminById(adminDto.id);
		if (adminDto.email) await this.isExisted(adminDto.email);
		if (adminDto.phoneNum) await this.isExisted(adminDto.phoneNum);

		const updatedAdmin = await prisma.admin.update({
			where: {
				id: adminDto.id,
				isDeleted: false
			},
			data: adminDto
		})

		return updatedAdmin
	}

	softDeleteAdmin = async (adminId) => {
		await this.getAdminById(adminId)

		const deletedAdmin = await prisma.admin.update({
			where: {
				id: adminId
			},
			data: {
				isDeleted: true
			}
		})

		return deletedAdmin
	}

	hardDeleteAdmin = async (adminId) => {

		this.getAdminById(adminId)

		const deletedAdmin = await prisma.admin.delete({
			where: {
				id: adminId
			}
		})

		return deletedAdmin
	}
}
