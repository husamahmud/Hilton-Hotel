/*
  Warnings:

  - A unique constraint covering the columns `[phoneNum]` on the table `ADMIN` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userName]` on the table `USER` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userName` to the `USER` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "USER" ADD COLUMN     "userName" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "ADMIN_phoneNum_key" ON "ADMIN"("phoneNum");

-- CreateIndex
CREATE UNIQUE INDEX "USER_userName_key" ON "USER"("userName");
