import prisma from "../prisma/prisma-client.js";

export class ContactUsDao {
    createContactUs = async (contactUsDto) => {
        const contact = await prisma.contactUs.create({
            data: contactUsDto
        });
        return contact;
    }

    getContactById = async (contactId) => {
        const contact = await prisma.contactUs.findUnique({
            where: {
                id: contactId
            }
        });
        return contact;
    }

    getAllContacts = async () => {
        const contacts = await prisma.contactUs.findMany({
            where: {
                isDeleted: false
            }
        });
        return contacts;
    }

    updateContactUs = async (contactUsDto) => {
        const contact = await prisma.contactUs.update({
            where: {
                id: contactUsDto.id
            },
            data: contactUsDto
        });
        return contact;
    }

    deleteContactUs = async (contactId) => {
        const contact = await prisma.contactUs.update({
            where: {
                id: contactId
            },
            data: {
                isDeleted: true
            }
        });
        return contact;
    }
}