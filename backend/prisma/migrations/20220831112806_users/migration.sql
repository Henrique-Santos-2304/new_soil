/*
  Warnings:

  - You are about to drop the column `name` on the `users` table. All the data in the column will be lost.
  - You are about to drop the `Adress` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `DataPerson` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `login` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_type` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "UserType" AS ENUM ('SUDO', 'USER');

-- DropForeignKey
ALTER TABLE "Adress" DROP CONSTRAINT "Adress_id_fkey";

-- DropForeignKey
ALTER TABLE "DataPerson" DROP CONSTRAINT "DataPerson_id_fkey";

-- AlterTable
ALTER TABLE "users" DROP COLUMN "name",
ADD COLUMN     "login" TEXT NOT NULL,
ADD COLUMN     "user_type" "UserType" NOT NULL;

-- DropTable
DROP TABLE "Adress";

-- DropTable
DROP TABLE "DataPerson";
