/*
  Warnings:

  - You are about to drop the column `refId` on the `Referral` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Referral_refId_key";

-- AlterTable
ALTER TABLE "Referral" DROP COLUMN "refId";
