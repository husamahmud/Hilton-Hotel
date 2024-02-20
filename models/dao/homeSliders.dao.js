import prisma from '../prisma/prisma-client.js';

export class HomeSliderDao {

    createSlider = async (sliderDto) => {
        const slider = await prisma.homeSliders.create({
            data: sliderDto
        });
        return slider;
    }

    getSliderById = async (sliderId) => {
        const slider = await prisma.homeSliders.findUnique({
            where: {
                id: sliderId
            }
        });
        return slider;
    }

    getAllSliders = async () => {
        const sliders = await prisma.homeSliders.findMany({
            orderBy: {
                createdAt: 'desc'
            },
            where: {
                isDeleted: false
            }
        });
        return sliders;
    }

    updateSlider = async (sliderDto) => {
        const slider = await prisma.homeSliders.update({
            where: {
                id: sliderDto.id
            },
            data: sliderDto
        });
        return slider;
    }

    deleteSlider = async (sliderId) => {
        const slider = await prisma.homeSliders.update({
            where: {
                id: sliderId
            },
            data: {
                isDeleted: true
            }
        });
        return slider;
    }
}