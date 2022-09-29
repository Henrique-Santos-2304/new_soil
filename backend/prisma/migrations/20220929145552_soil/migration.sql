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
    "farm_long" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "farms_pkey" PRIMARY KEY ("farm_id")
);

-- CreateTable
CREATE TABLE "AdminsOnFarms" (
    "adminId" TEXT NOT NULL,
    "farmId" TEXT NOT NULL,

    CONSTRAINT "AdminsOnFarms_pkey" PRIMARY KEY ("adminId","farmId")
);

-- CreateTable
CREATE TABLE "DealersOnFarms" (
    "dealerId" TEXT NOT NULL,
    "farmId" TEXT NOT NULL,

    CONSTRAINT "DealersOnFarms_pkey" PRIMARY KEY ("dealerId","farmId")
);

-- CreateTable
CREATE TABLE "UserOnFarms" (
    "userId" TEXT NOT NULL,
    "farmId" TEXT NOT NULL,

    CONSTRAINT "UserOnFarms_pkey" PRIMARY KEY ("userId","farmId")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_user_id_key" ON "users"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "farms_farm_id_key" ON "farms"("farm_id");

-- CreateIndex
CREATE UNIQUE INDEX "farms_farm_name_key" ON "farms"("farm_name");

-- AddForeignKey
ALTER TABLE "AdminsOnFarms" ADD CONSTRAINT "AdminsOnFarms_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "users"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AdminsOnFarms" ADD CONSTRAINT "AdminsOnFarms_farmId_fkey" FOREIGN KEY ("farmId") REFERENCES "farms"("farm_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DealersOnFarms" ADD CONSTRAINT "DealersOnFarms_dealerId_fkey" FOREIGN KEY ("dealerId") REFERENCES "users"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DealersOnFarms" ADD CONSTRAINT "DealersOnFarms_farmId_fkey" FOREIGN KEY ("farmId") REFERENCES "farms"("farm_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserOnFarms" ADD CONSTRAINT "UserOnFarms_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserOnFarms" ADD CONSTRAINT "UserOnFarms_farmId_fkey" FOREIGN KEY ("farmId") REFERENCES "farms"("farm_id") ON DELETE RESTRICT ON UPDATE CASCADE;
