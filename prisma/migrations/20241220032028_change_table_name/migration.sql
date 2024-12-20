/*
  Warnings:

  - You are about to drop the `company_phones` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "company_phones" DROP CONSTRAINT "company_phones_company_id_fkey";

-- DropTable
DROP TABLE "company_phones";

-- CreateTable
CREATE TABLE "company_phone" (
    "id" SERIAL NOT NULL,
    "phone_number" TEXT NOT NULL,
    "company_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "company_phone_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "company_phone" ADD CONSTRAINT "company_phone_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "companies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
