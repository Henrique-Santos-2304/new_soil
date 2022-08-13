-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DataPerson" (
    "id" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "rg" TEXT,
    "telephone" TEXT[],

    CONSTRAINT "DataPerson_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Adress" (
    "id" TEXT NOT NULL,
    "cep" TEXT NOT NULL,
    "road" TEXT NOT NULL,
    "number" INTEGER NOT NULL,
    "district" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,

    CONSTRAINT "Adress_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_id_key" ON "users"("id");

-- CreateIndex
CREATE UNIQUE INDEX "DataPerson_id_key" ON "DataPerson"("id");

-- CreateIndex
CREATE UNIQUE INDEX "DataPerson_cpf_key" ON "DataPerson"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "DataPerson_rg_key" ON "DataPerson"("rg");

-- CreateIndex
CREATE UNIQUE INDEX "Adress_id_key" ON "Adress"("id");

-- AddForeignKey
ALTER TABLE "DataPerson" ADD CONSTRAINT "DataPerson_id_fkey" FOREIGN KEY ("id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Adress" ADD CONSTRAINT "Adress_id_fkey" FOREIGN KEY ("id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
