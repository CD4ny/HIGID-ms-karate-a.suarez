/*
  Warnings:

  - The `startDate` column on the `CompetitiveActivity` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `endDate` column on the `CompetitiveActivity` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "CompetitiveActivity" DROP COLUMN "startDate",
ADD COLUMN     "startDate" INTEGER,
DROP COLUMN "endDate",
ADD COLUMN     "endDate" INTEGER;
