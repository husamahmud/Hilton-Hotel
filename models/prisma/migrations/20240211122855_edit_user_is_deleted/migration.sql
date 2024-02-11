/*
  Warnings:

  - You are about to drop the column `isDelted` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "isDelted",
ADD COLUMN     "isDeleted" BOOLEAN NOT NULL DEFAULT false;
