/*
  Warnings:

  - You are about to drop the column `evaluation` on the `IndicatorOnKumite` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "IndicatorOnKumite" DROP COLUMN "evaluation";

-- AlterTable
ALTER TABLE "Kumite" ADD COLUMN     "evaluation" TEXT;
