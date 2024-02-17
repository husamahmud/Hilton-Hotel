import e from 'express';
import prisma from '../prisma/prisma-client.js';

export class ExtraServicesDao {
    // validate IDs in all methods

    createExtraServices = async (extraServicesDto) => {
        console.log(extraServicesDto);
        const extraServices = await prisma.extraServices.create({
            data: extraServicesDto
        })

        return extraServices;
    }

    getAllExtraServices = async () => {
        const extraServices = await prisma.extraServices.findMany();

        return extraServices;
    }

    getExtraServicesById = async (serviceId) => {
        const extraServices = await prisma.extraServices.findUnique({
            where: {
                id: serviceId
            }
        })

        return extraServices;
    }

    getRoomExtraServices = async (roomId) => {
        console.log(roomId);
        const extraServices = await prisma.extraServices.findMany({
            where: {
                roomId,
                isDeleted: false
            }
        })

        return extraServices;
    }

    updateExtraServices = async (extraServicesDto) => {
        console.log(extraServicesDto);
        const extraServices = await prisma.extraServices.update({
            where: {
                id : extraServicesDto.id
            },
            data: extraServicesDto
        })

        return extraServices;
    }

    deleteExtraServices = async (serviceId) => {
        const extraServices = await prisma.extraServices.update({
            where: {
                id: serviceId
            },
            data: {
                isDeleted: true
            }
        })

        return extraServices;
    }
}
