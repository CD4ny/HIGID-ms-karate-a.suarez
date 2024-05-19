/*
  Warnings:

  - Added the required column `owner` to the `CompetitiveActivity` table without a default value. This is not possible if the table is not empty.
  - Added the required column `owner` to the `Indicator` table without a default value. This is not possible if the table is not empty.
  - Added the required column `owner` to the `Karateca` table without a default value. This is not possible if the table is not empty.
  - Added the required column `owner` to the `Kumite` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "CompetitiveActivity" ADD COLUMN     "owner" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Indicator" ADD COLUMN     "owner" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Karateca" ADD COLUMN     "owner" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Kumite" ADD COLUMN     "owner" TEXT NOT NULL;
