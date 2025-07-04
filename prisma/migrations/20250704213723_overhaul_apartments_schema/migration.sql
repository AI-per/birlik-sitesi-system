/*
  Warnings:

  - You are about to drop the column `squareMeters` on the `apartments` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `apartments` table. All the data in the column will be lost.
  - You are about to drop the column `apartmentId` on the `users` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_apartmentId_fkey";

-- AlterTable
ALTER TABLE "apartments" DROP COLUMN "squareMeters",
DROP COLUMN "type",
ADD COLUMN     "ownerId" TEXT,
ADD COLUMN     "residentId" TEXT;

-- AlterTable
ALTER TABLE "users" DROP COLUMN "apartmentId";

-- AddForeignKey
ALTER TABLE "apartments" ADD CONSTRAINT "apartments_residentId_fkey" FOREIGN KEY ("residentId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "apartments" ADD CONSTRAINT "apartments_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
