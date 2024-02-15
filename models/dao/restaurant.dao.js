import prisma from '../prisma/prisma-client.js';

export class RestaurantDao {
    createRestaurant = async (restaurantDto) => {
        const restaurant = await prisma.restaurant.create({
            data: restaurantDto
        });
        return restaurant;
    }

    // TODO validate restaurant id
    getRestaurantById = async (id) => {
        const restaurant = await prisma.restaurant.findUnique({
            where: {
                id: id
            }
        });
        return restaurant;
    }

    getRestaurants = async () => {
        const restaurants = await prisma.restaurant.findMany();
        return restaurants;
    }

    updateRestaurant = async (restaurantDto) => {
        const updatedRestaurant = await prisma.restaurant.update({
            where: {
                id: restaurantDto.id
            },
            data: restaurantDto
        });
        return updatedRestaurant;
    }

}