import prisma from "../../models/prisma/prisma-client.js";

export async function validateRoomId(roomId) {
    const room = await prisma.room.findUnique({
        where: {
            id: roomId,
        },
    });
    if (!room) throw new Error("Room not found");
}

export async function validateRestaurantId(restaurantId) {
    const restaurant = await prisma.restaurant.findUnique({
        where: {
            id: restaurantId,
        },
    });
    if (!restaurant) throw new Error("Restaurant not found");
}

export async function validateNewsId (newsId) {
    const news = await prisma.news.findUnique({
        where: {
            id: newsId,
        },
    });
    if (!news) throw new Error("News not found");
}
