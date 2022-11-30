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

-- CreateTable
CREATE TABLE "farms" (
    "farm_id" TEXT NOT NULL,
    "farm_name" TEXT NOT NULL,
    "farm_city" TEXT NOT NULL,
    "farm_lat" DOUBLE PRECISION NOT NULL,
    "farm_lng" DOUBLE PRECISION NOT NULL,
    "owner_id" TEXT NOT NULL,
    "created_by" TEXT NOT NULL,
    "updated_by" TEXT,
    "admins" TEXT[],
    "dealers" TEXT[],
    "users" TEXT[],

    CONSTRAINT "farms_pkey" PRIMARY KEY ("farm_id")
);

-- CreateTable
CREATE TABLE "authorize" (
    "authorize_id" TEXT NOT NULL,
    "created_by" TEXT NOT NULL,
    "farm_id" TEXT,
    "pivot_id" TEXT,

    CONSTRAINT "authorize_pkey" PRIMARY KEY ("authorize_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_user_id_key" ON "users"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "farms_farm_id_key" ON "farms"("farm_id");

-- CreateIndex
CREATE UNIQUE INDEX "farms_farm_name_key" ON "farms"("farm_name");

-- CreateIndex
CREATE UNIQUE INDEX "farms_owner_id_key" ON "farms"("owner_id");

-- CreateIndex
CREATE UNIQUE INDEX "authorize_authorize_id_key" ON "authorize"("authorize_id");

-- AddForeignKey
ALTER TABLE "farms" ADD CONSTRAINT "farms_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "users"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;
