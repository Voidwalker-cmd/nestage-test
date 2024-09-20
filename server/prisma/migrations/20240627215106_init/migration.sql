/*
  Warnings:

  - You are about to drop the `AdminWallet` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "AdminWallet" DROP CONSTRAINT "AdminWallet_adminId_fkey";

-- DropTable
DROP TABLE "AdminWallet";

-- CreateTable
CREATE TABLE "AdminAddress" (
    "id" SERIAL NOT NULL,
    "adminId" INTEGER NOT NULL,
    "type" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "AdminAddress_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "AdminAddress_adminId_key" ON "AdminAddress"("adminId");

-- CreateIndex
CREATE UNIQUE INDEX "AdminAddress_address_key" ON "AdminAddress"("address");

-- AddForeignKey
ALTER TABLE "AdminAddress" ADD CONSTRAINT "AdminAddress_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "Admin"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
