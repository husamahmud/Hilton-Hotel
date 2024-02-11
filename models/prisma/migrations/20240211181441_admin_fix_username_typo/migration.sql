/*
  Warnings:

  - You are about to drop the column `userName` on the `Admin` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[username]` on the table `Admin` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `username` to the `Admin` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Admin_userName_key";

-- AlterTable
ALTER TABLE "Admin" DROP COLUMN "userName",
ADD COLUMN     "username" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Admin_username_key" ON "Admin"("username");
