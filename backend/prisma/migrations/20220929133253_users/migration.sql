-- CreateEnum
CREATE TYPE "UserType" AS ENUM ('MASTER', 'DEALER', 'ADMIN', 'USER');

-- CreateTable
CREATE TABLE "users" (
    "user_id" TEXT NOT NULL,
    "login" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "userType" "UserType" NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("user_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_user_id_key" ON "users"("user_id");
