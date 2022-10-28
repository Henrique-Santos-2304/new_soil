/*
  Warnings:

  - A unique constraint covering the columns `[owner_id]` on the table `farms` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "farms_owner_id_key" ON "farms"("owner_id");
