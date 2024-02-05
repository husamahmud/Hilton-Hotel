import prisma from '../prisma/prisma-client.js';

export class AdminDao {
	createAdmin = async (adminDto) => {
		const isExistedEmail = await prisma.admin.findUnique({
			where: {
				email: adminDto.email
			}
		})
		if (isExistedEmail) {
			throw new Error('Email is already in use!')
		}

		const isExistedPhone = await prisma.admin.findUnique({
			where: {
				phoneNum: adminDto.phoneNum
			}
		})
		if (isExistedPhone) {
			throw new Error('Phone number is already in use!')
		}

		const newAdmin = await prisma.admin.create({
			data: adminDto
		})

		return newAdmin
	}
}
