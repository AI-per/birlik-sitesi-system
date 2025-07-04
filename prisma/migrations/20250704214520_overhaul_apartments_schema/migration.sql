/*
  Warnings:

  - A unique constraint covering the columns `[residentId]` on the table `apartments` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[ownerId]` on the table `apartments` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "apartments_residentId_key" ON "apartments"("residentId");

-- CreateIndex
CREATE UNIQUE INDEX "apartments_ownerId_key" ON "apartments"("ownerId");
