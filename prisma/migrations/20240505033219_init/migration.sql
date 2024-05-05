/*
  Warnings:

  - The primary key for the `Indicator` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "IndicatorOnKumite" DROP CONSTRAINT "IndicatorOnKumite_indicatorId_fkey";

-- AlterTable
ALTER TABLE "Indicator" DROP CONSTRAINT "Indicator_pkey",
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Indicator_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "IndicatorOnKumite" ALTER COLUMN "indicatorId" SET DATA TYPE TEXT;

-- AddForeignKey
ALTER TABLE "IndicatorOnKumite" ADD CONSTRAINT "IndicatorOnKumite_indicatorId_fkey" FOREIGN KEY ("indicatorId") REFERENCES "Indicator"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
