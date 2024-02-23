import prisma from '../prisma/prisma-client.js';

export class PromoVidDao {
  createPromoVid = async (promoVidDto) => {
    const promoVid = await prisma.promotionVid.create({
      data: promoVidDto,
    });
    return promoVid;
  };

  getAllPromoVids = async () => {
    const promoVids = await prisma.promotionVid.findMany();
    return promoVids;
  };

  getPromoVidById = async (promoVidId) => {
    const promoVid = await prisma.promotionVid.findUnique({
      where: {
        id: promoVidId,
      },
    });
    return promoVid;
  };

  updatePromoVid = async (promoVidDto) => {
    const promoVid = await prisma.promotionVid.update({
      where: {
        id: promoVidDto.id,
      },
      data: promoVidDto,
    });
    return promoVid;
  };

  deletePromoVid = async (promoVidId) => {
    const promoVid = await prisma.promotionVid.delete({
      where: {
        id: promoVidId,
      },
    });
    return promoVid;
  };
}
