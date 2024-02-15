import prisma from "../prisma/prisma-client.js";

export class RoomReservationDao {
    createRoomReservation = async (roomReservationDto) => {
        const roomReserved = await prisma.roomReservation.findMany({
          where: {
            roomId: roomReservationDto.roomId,
            isDeleted: false,
          },
        });
        if (roomReserved.length > 0) {
          for (const reservation of roomReserved) {
            const roomCheckIn = new Date(reservation.checkIn);
            const roomCheckOut = new Date(reservation.checkOut);
            if (roomCheckIn <= roomReservationDto.checkOut && roomCheckOut >= roomReservationDto.checkIn) {
              throw new Error('Room is already reserved');
            }
          }
        }
        const newReservedRoom = await prisma.roomReservation.create({
          data: roomReservationDto,
        });
        return newReservedRoom;
      };

      getRoomReservations = async () => {
        const roomReservations = await prisma.roomReservation.findMany({
          where: {
            isDeleted: false,
          },
        });
        return roomReservations;
      }

      getRoomReservationById = async (roomReservationId) => {
        const roomReservation = await prisma.roomReservation.findUnique({
          where: {
            id: roomReservationId,
            isDeleted: false,
          },
        });
        if (!roomReservation) throw new Error('Room reservation is not found');
        return roomReservation;
      }
      // TODO validate roomReservationId

      updateRoomReservation = async (roomReservationDto) => {
        await this.getRoomReservationById(roomReservationDto.id);

        if (roomReservationDto.checkIn || roomReservationDto.checkOut) {
          const roomReserved = await prisma.roomReservation.findMany({
            where: {
              roomId: roomReservationDto.roomId,
              isDeleted: false,
            },
          });
          if (roomReserved.length > 0) {
            for (const reservation of roomReserved) {
              const roomCheckIn = new Date(reservation.checkIn);
              const roomCheckOut = new Date(reservation.checkOut);
              if (roomCheckIn <= roomReservationDto.checkOut && roomCheckOut >= roomReservationDto.checkIn) {
                throw new Error('Room is already reserved');
              }
            }
          }
        }

        const updatedRoomReservation = await prisma.roomReservation.update({
          where: {
            id: roomReservationDto.id,
          },
          data: roomReservationDto,
        });
        return updatedRoomReservation;
      };

      cancelRoomReservation = async (roomReservationId) => {
        await this.getRoomReservationById(roomReservationId);
        const canceledRoomReservation = await prisma.roomReservation.update({
          where: {
            id: roomReservationId,
          },
          data: {
            isDeleted: true,
            deletedAt: new Date(),
          },
        });
        return canceledRoomReservation;
      };
}
