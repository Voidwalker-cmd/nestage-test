-- CreateTable
CREATE TABLE "Referral" (
    "id" SERIAL NOT NULL,
    "address" TEXT NOT NULL,
    "refId" INTEGER NOT NULL,
    "uplinkId" INTEGER,

    CONSTRAINT "Referral_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Referral_address_key" ON "Referral"("address");

-- CreateIndex
CREATE UNIQUE INDEX "Referral_refId_key" ON "Referral"("refId");

-- AddForeignKey
ALTER TABLE "Referral" ADD CONSTRAINT "Referral_uplinkId_fkey" FOREIGN KEY ("uplinkId") REFERENCES "Referral"("id") ON DELETE SET NULL ON UPDATE CASCADE;
