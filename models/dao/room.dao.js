import prisma from '../prisma/prisma-client.js';

export class RoomDao {
  createRoom = async (roomDto) => {
    const isExistedRoom = await prisma.room.findUnique({
      where: {
        roomNum: roomDto.roomNum,
      },
    });
    if (isExistedRoom) throw new Error('Room num is already existed');

    const newRoom = await prisma.room.create({
      data: roomDto,
    });
    return newRoom;
  };

  getRoomById = async (roomId) => {
    const room = await prisma.room.findUnique({
      where: {
        id: roomId,
        isDeleted: false,
      },
    });
    if (!room) throw new Error('Room is not found');
    return room;
  };

  getAllRooms = async () => {
    const rooms = await prisma.room.findMany({
      where: {
        isDeleted: false,
      },
    });
    return rooms;
  };

  getRoomByRoomNum = async (roomNum) => {
    const room = await prisma.room.findMany({
      where: {
        roomNum,
      },
    });
    return room;
  };

  updateRoom = async (roomDto) => {
    const updatedRoom = await prisma.room.update({
      where: {
        id: roomDto.id,
      },
      data: roomDto,
    });
    return updatedRoom;
  };

  softDeleteRoom = async (roomId) => {
    await this.getRoomById(roomId);
    const deletedRoom = await prisma.room.update({
      where: {
        id: roomId,
      },
      data: {
        isDeleted: true,
      },
    });
    return deletedRoom;
  };

  /****************************************************************************/
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
        if (room.isReserved === true &&
          (roomCheckIn <= roomReservationDto.checkOut && roomCheckOut >= roomReservationDto.checkIn)) {
          throw new Error('Room is already reserved');
        }
      }
    }
    const newReservedRoom = await prisma.roomReservation.create({
      data: roomReservationDto,
    });
    return newReservedRoom;
  };

  // TODO validate roomReservationId

  updateRoomReservation = async (roomReservationDto) => {
    const updatedRoomReservation = await prisma.roomReservation.update({
      where: {
        id: roomReservationDto.id,
      },
      data: roomReservationDto,
    });
    return updatedRoomReservation;
  };

  cancelRoomReservation = async (roomReservationId) => {
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


//
//     const reserveCheckIn = roomDto.checkIn;
//     const reserveCheckOut = roomDto.checkOut;
//     const roomCheckIn = room.checkIn;
//     const roomCheckOut = room.checkOut;
//     let reservedRoom;
//
//     if (room.isReserved === true &&
//       (roomCheckIn <= reserveCheckOut && roomCheckOut >= reserveCheckIn)) {
//       // reservedRoom =
//     } else {
//       throw new Error('Room is already reserved');
//     }

/**
 * const checkInDate = new Date('2024-02-21');
 * const checkOutDate = new Date('2024-02-31');
 *
 * const resCheckIn = new Date('2024-02-19');
 * const resCheckOut = new Date('2024-02-30');
 *
 * if (checkInDate <= resCheckOut && checkOutDate >= resCheckIn)
 *   console.log('Reserved');
 * else
 *   console.log('Availabe');
 **/

/**
 * Logic - reserve
 * 1. search w roomNum
 * 2. make sure that the room is not reserved (in the desired date)
 * 3. room is not deleted
 *******************************************************************************
 *
 *
 *
 *
 *
 *
 **/
