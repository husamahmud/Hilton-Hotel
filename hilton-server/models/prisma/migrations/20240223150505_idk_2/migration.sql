-- DropForeignKey
ALTER TABLE "HomeSliders" DROP CONSTRAINT "HomeSliders_adminId_fkey";

-- DropForeignKey
ALTER TABLE "PromotionVid" DROP CONSTRAINT "PromotionVid_adminId_fkey";

-- DropIndex
DROP INDEX "AppSettings_adminId_key";

-- AddForeignKey
ALTER TABLE "HomeSliders" ADD CONSTRAINT "HomeSliders_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "Admin"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PromotionVid" ADD CONSTRAINT "PromotionVid_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "Admin"("id") ON DELETE CASCADE ON UPDATE CASCADE;
