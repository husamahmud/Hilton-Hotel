import prisma from '../prisma/prisma-client.js';

export class SettingsDao {

    createSettings = async (settingsDto) => {
        const settings = await prisma.appSettings.create({
            data: settingsDto
        })

        return settings;
    }

    getSettings = async () => {
        const settings = await prisma.appSettings.findFirst();

        return settings;
    }

    updateSettings = async (settingsDto) => {
        const settings = await prisma.appSettings.update({
            where: {
                id: settingsDto.id
            },
            data: settingsDto
        });

        return settings;
    }
}
