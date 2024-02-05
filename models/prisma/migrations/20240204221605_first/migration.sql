-- CreateEnum
CREATE TYPE "RoomTypes" AS ENUM ('JUNIOR_SUITE', 'FAMILY_ROOM', 'DOUBLE_ROOM', 'DELAUX_ROOM', 'SUPERIOR_ROOM');

-- CreateEnum
CREATE TYPE "MenuTypes" AS ENUM ('STARTERS', 'MAINS', 'SALADS', 'WINE');

-- CreateEnum
CREATE TYPE "clubhouseTypes" AS ENUM ('SPA', 'GYM', 'HEALTHCLUB');

-- CreateTable
CREATE TABLE "ADMIN" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "fullName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "profilePic" TEXT,
    "birthDate" TIMESTAMP(3) NOT NULL,
    "phoneNum" TIMESTAMP(3) NOT NULL,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "ADMIN_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "USER" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "fName" TEXT NOT NULL,
    "lName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "profilePic" TEXT,
    "birthDate" TIMESTAMP(3) NOT NULL,
    "country" TEXT NOT NULL,
    "nationalID" TEXT NOT NULL,
    "isBlocked" BOOLEAN NOT NULL DEFAULT false,
    "isDelted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "USER_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ROOM" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "roomNum" TEXT NOT NULL,
    "checkIn" TIMESTAMP(3) NOT NULL,
    "checkOut" TIMESTAMP(3) NOT NULL,
    "types" "RoomTypes" NOT NULL DEFAULT 'JUNIOR_SUITE',
    "price" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "aminities" TEXT[],
    "images" TEXT[],
    "adults" INTEGER NOT NULL,
    "children" INTEGER NOT NULL,
    "view" TEXT NOT NULL,
    "isReserved" BOOLEAN NOT NULL DEFAULT false,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "ROOM_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ExtraServices" (
    "id" TEXT NOT NULL,
    "roomId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "price" TEXT NOT NULL,
    "facilities" TEXT[],
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "ExtraServices_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "REVIEW" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "rating" DOUBLE PRECISION NOT NULL,
    "comment" TEXT NOT NULL,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "REVIEW_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RESTAURANT" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "RESTAURANT_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MENU" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "restaurantId" TEXT NOT NULL,
    "menuTypes" "MenuTypes" NOT NULL,
    "name" TEXT NOT NULL,
    "ingredients" TEXT NOT NULL,
    "price" TEXT NOT NULL,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "MENU_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CLUBHOUSE" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "clubhouseTypes" "clubhouseTypes" NOT NULL,
    "description" TEXT NOT NULL,
    "startTime" TIMESTAMP(3) NOT NULL,
    "endTime" TIMESTAMP(3) NOT NULL,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "CLUBHOUSE_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FAQS" (
    "id" TEXT NOT NULL,
    "question" TEXT NOT NULL,
    "answer" TEXT NOT NULL,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "FAQS_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "NEWS" (
    "id" TEXT NOT NULL,
    "adminId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "title" TEXT NOT NULL,
    "subTitle" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "images" TEXT[],
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "NEWS_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "REPLY" (
    "id" TEXT NOT NULL,
    "newsId" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "comment" TEXT NOT NULL,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "REPLY_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CONTACTUS" (
    "id" TEXT NOT NULL,
    "adminId" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phoneNum" TEXT NOT NULL,
    "subject" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,
    "isRead" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "CONTACTUS_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AppSettings" (
    "id" TEXT NOT NULL,
    "adminId" TEXT NOT NULL,
    "hotelName" TEXT NOT NULL,
    "logo" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "phoneNum" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "socialMedia" JSONB NOT NULL,

    CONSTRAINT "AppSettings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HOMESLIDERS" (
    "id" TEXT NOT NULL,
    "adminId" TEXT NOT NULL,
    "photo" TEXT NOT NULL,
    "header" TEXT NOT NULL,
    "paragraph" TEXT NOT NULL,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "HOMESLIDERS_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PROMOTIONVIDEO" (
    "id" TEXT NOT NULL,
    "adminId" TEXT NOT NULL,
    "video" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "PROMOTIONVIDEO_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ADMIN_email_key" ON "ADMIN"("email");

-- CreateIndex
CREATE UNIQUE INDEX "USER_email_key" ON "USER"("email");

-- CreateIndex
CREATE UNIQUE INDEX "USER_nationalID_key" ON "USER"("nationalID");

-- CreateIndex
CREATE UNIQUE INDEX "REVIEW_userId_key" ON "REVIEW"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "AppSettings_adminId_key" ON "AppSettings"("adminId");

-- CreateIndex
CREATE UNIQUE INDEX "PROMOTIONVIDEO_adminId_key" ON "PROMOTIONVIDEO"("adminId");

-- AddForeignKey
ALTER TABLE "ROOM" ADD CONSTRAINT "ROOM_userId_fkey" FOREIGN KEY ("userId") REFERENCES "USER"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExtraServices" ADD CONSTRAINT "ExtraServices_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "ROOM"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "REVIEW" ADD CONSTRAINT "REVIEW_userId_fkey" FOREIGN KEY ("userId") REFERENCES "USER"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RESTAURANT" ADD CONSTRAINT "RESTAURANT_userId_fkey" FOREIGN KEY ("userId") REFERENCES "USER"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MENU" ADD CONSTRAINT "MENU_userId_fkey" FOREIGN KEY ("userId") REFERENCES "USER"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MENU" ADD CONSTRAINT "MENU_restaurantId_fkey" FOREIGN KEY ("restaurantId") REFERENCES "RESTAURANT"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CLUBHOUSE" ADD CONSTRAINT "CLUBHOUSE_userId_fkey" FOREIGN KEY ("userId") REFERENCES "USER"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NEWS" ADD CONSTRAINT "NEWS_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "ADMIN"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "REPLY" ADD CONSTRAINT "REPLY_newsId_fkey" FOREIGN KEY ("newsId") REFERENCES "NEWS"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CONTACTUS" ADD CONSTRAINT "CONTACTUS_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "ADMIN"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AppSettings" ADD CONSTRAINT "AppSettings_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "ADMIN"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HOMESLIDERS" ADD CONSTRAINT "HOMESLIDERS_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "AppSettings"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PROMOTIONVIDEO" ADD CONSTRAINT "PROMOTIONVIDEO_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "AppSettings"("id") ON DELETE CASCADE ON UPDATE CASCADE;
