import prisma from '../prisma/prisma-client.js';

export class MenuDao {

    // validate Ids 
    createMenu = async (menuDto) => {
        const menu =  await prisma.menu.create({
            data:menuDto
        });

        return menu;
    }

    getAllMenus = async () => {
        const menu = await prisma.menu.findMany();

        return menu;
    }

    getMenusByRestaurantId = async (restaurantId) => {
        const menu = await prisma.menu.findMany({
            where: {
                restaurantId: restaurantId
            }
        });

        return menu;
    }

    getMenuByUserId = async (userId) => {
        const menu = await prisma.menu.findMany({
            where: {
                userId: userId
            }
        });

        return menu;
    }

    getMenuById = async (id) => {
        const menu = await prisma.menu.findUnique({
            where: {
                id: id
            }
        });

        return menu;
    }

    updateMenu = async (menuDto) => {

        const menu = await prisma.menu.update({
            where: {
                id: menuDto.id
            },
            data: menuDto
        });

        return menu;
    }

    deleteMenu = async (id) => {
        const menu = await prisma.menu.delete({
            where: {
                id: id
            }
        });

        return menu;
    }
}