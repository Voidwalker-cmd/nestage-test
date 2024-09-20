-- DropForeignKey
ALTER TABLE "AdminAddress" DROP CONSTRAINT "AdminAddress_adminId_fkey";

-- DropIndex
DROP INDEX "AdminAddress_adminId_key";

-- AddForeignKey
ALTER TABLE "AdminAddress" ADD CONSTRAINT "AdminAddress_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "Admin"("id") ON DELETE CASCADE ON UPDATE CASCADE;
