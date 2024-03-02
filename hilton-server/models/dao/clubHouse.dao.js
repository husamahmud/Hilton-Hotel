import prisma from '../prisma/prisma-client.js';

export class ClubHouseDao {
  createClubHouse = async (clubHouseDto) => {
    const clubHouse = await prisma.clubHouse.create({
      data: clubHouseDto,
    });
    return clubHouse;
  };

  getAllClubHouses = async () => {
    const clubHouses = await prisma.clubHouse.findMany({
      where: {
        isDeleted: false,
      },
    });
    return clubHouses;
  };

  getClubHouseById = async (clubHouseId) => {
    const clubHouse = await prisma.clubHouse.findUnique({
      where: {
        id: clubHouseId,
      },
    });
    return clubHouse;
  };

  updateClubHouse = async (clubHouseDto) => {
    const updatedClubHouse = await prisma.clubHouse.update({
      where: {
        id: clubHouseDto.id,
      },
      data: clubHouseDto,
    });
    return updatedClubHouse;
  };

  deleteClubHouse = async (clubHouseId) => {
    const clubHouse = await prisma.clubHouse.delete({
      where: {
        id: clubHouseId,
      },
    });
    return clubHouse;
  };
}
