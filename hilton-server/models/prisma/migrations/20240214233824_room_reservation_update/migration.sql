/*
  Warnings:

  - Made the column `checkIn` on table `RoomReservation` required. This step will fail if there are existing NULL values in that column.
  - Made the column `checkOut` on table `RoomReservation` required. This step will fail if there are existing NULL values in that column.
  - Made the column `adults` on table `RoomReservation` required. This step will fail if there are existing NULL values in that column.
  - Made the column `children` on table `RoomReservation` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "RoomReservation" ALTER COLUMN "checkIn" SET NOT NULL,
ALTER COLUMN "checkOut" SET NOT NULL,
ALTER COLUMN "adults" SET NOT NULL,
ALTER COLUMN "children" SET NOT NULL;
