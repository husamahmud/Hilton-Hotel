import e from 'express';
import prisma from '../prisma/prisma-client.js';

export class ExtraServicesDao {
    // validate IDs in all methods

    createExtraServices(extraServicesDto) {
        console.log(extraServicesDto);
        const extraServices = prisma.extraServices.create({
            data: extraServicesDto
        })

        return extraServices;
    }

    getAllExtraServices() {
        const extraServices = prisma.extraServices.findMany();

        return extraServices;
    }

    getExtraServicesById(serviceId) {
        const extraServices = prisma.extraServices.findUnique({
            where: {
                id: serviceId
            }
        })

        return extraServices;
    }

    getRoomExtraServices(roomId) {
        console.log(roomId);
        const extraServices = prisma.extraServices.findMany({
            where: {
                roomId,
                isDeleted: false
            }
        })

        return extraServices;
    }

    updateExtraServices(extraServicesDto) {
        console.log(extraServicesDto);
        const extraServices = prisma.extraServices.update({
            where: {
                id : extraServicesDto.id
            },
            data: extraServicesDto
        })

        return extraServices;
    }

    deleteExtraServices(serviceId) {
        const extraServices = prisma.extraServices.update({
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