/*
  Warnings:

  - Added the required column `owner` to the `CompetitiveActivityKarateca_Kumite` table without a default value. This is not possible if the table is not empty.
  - Added the required column `owner` to the `IndicatorOnKumite` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "CompetitiveActivityKarateca_Kumite" ADD COLUMN     "owner" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "IndicatorOnKumite" ADD COLUMN     "owner" TEXT NOT NULL;
