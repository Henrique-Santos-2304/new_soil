-- CreateTable
CREATE TABLE "authorize" (
    "authorize_id" TEXT NOT NULL,
    "created_by" TEXT NOT NULL,
    "farm_id" TEXT,
    "pivot_id" TEXT,

    CONSTRAINT "authorize_pkey" PRIMARY KEY ("authorize_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "authorize_authorize_id_key" ON "authorize"("authorize_id");
