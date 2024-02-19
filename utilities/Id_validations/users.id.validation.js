import prisma from "../../models/prisma/prisma-client.js";


export async function validateUserId(userId) {
    const user = await prisma.user.findUnique({
        where: {
            id: userId,
        },
    });
    if (!user) throw new Error("User not found");
}

export async function validateAdminId(adminId) {
    const admin = await prisma.admin.findUnique({
        where: {
            id: adminId,
        },
    });
    if (!admin) throw new Error("Admin not found");
}