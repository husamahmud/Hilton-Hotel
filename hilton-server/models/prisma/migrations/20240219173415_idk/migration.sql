/*
  Warnings:

  - You are about to drop the column `userId` on the `Restaurant` table. All the data in the column will be lost.
  - You are about to drop the column `isReserved` on the `Room` table. All the data in the column will be lost.
  - Added the required column `updatedAt` to the `AppSettings` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `ClubHouse` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `ContactUs` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `ExtraServices` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `FAQS` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `HomeSliders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `image` to the `Menu` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Menu` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `PromotionVid` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Reply` table without a default value. This is not possible if the table is not empty.
  - Added the required column `adminId` to the `Restaurant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Restaurant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Review` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Restaurant" DROP CONSTRAINT "Restaurant_userId_fkey";

-- AlterTable
ALTER TABLE "AppSettings" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "ClubHouse" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "ContactUs" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "adminId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "ExtraServices" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "FAQS" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "HomeSliders" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Menu" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "deletedAt" TIMESTAMP(3),
ADD COLUMN     "image" TEXT NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "PromotionVid" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Reply" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Restaurant" DROP COLUMN "userId",
ADD COLUMN     "adminId" TEXT NOT NULL,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Review" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Room" DROP COLUMN "isReserved";

-- AddForeignKey
ALTER TABLE "Restaurant" ADD CONSTRAINT "Restaurant_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "Admin"("id") ON DELETE CASCADE ON UPDATE CASCADE;
