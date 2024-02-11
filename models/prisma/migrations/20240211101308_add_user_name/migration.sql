/*
  Warnings:

  - A unique constraint covering the columns `[userName]` on the table `Admin` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userName` to the `Admin` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Admin" ADD COLUMN     "emailConfirmed" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "userName" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "emailConfirmed" BOOLEAN NOT NULL DEFAULT false;

-- CreateIndex
CREATE UNIQUE INDEX "Admin_userName_key" ON "Admin"("userName");

-- RenameIndex
ALTER INDEX "ConfirmToken_adminId_userId_idx" RENAME TO "adminId_userId_Confrimindex";

-- RenameIndex
ALTER INDEX "RefreshToken_adminId_userId_idx" RENAME TO "adminId_userId_Refreshindex";

-- RenameIndex
ALTER INDEX "ResetToken_adminId_userId_idx" RENAME TO "adminId_userId_Resetindex";
