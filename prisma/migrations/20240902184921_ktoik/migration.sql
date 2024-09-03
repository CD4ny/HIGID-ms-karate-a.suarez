/*
  Warnings:

  - You are about to drop the column `distance` on the `Kumite` table. All the data in the column will be lost.
  - You are about to drop the column `evaluation` on the `Kumite` table. All the data in the column will be lost.
  - You are about to drop the column `informalWarnings` on the `Kumite` table. All the data in the column will be lost.
  - You are about to drop the column `kumiteEnding` on the `Kumite` table. All the data in the column will be lost.
  - You are about to drop the column `kumiteType` on the `Kumite` table. All the data in the column will be lost.
  - You are about to drop the column `levelOfPreparation` on the `Kumite` table. All the data in the column will be lost.
  - You are about to drop the column `motorSequence` on the `Kumite` table. All the data in the column will be lost.
  - You are about to drop the column `officialWarnings` on the `Kumite` table. All the data in the column will be lost.
  - You are about to drop the column `partialTimes` on the `Kumite` table. All the data in the column will be lost.
  - You are about to drop the column `penalties` on the `Kumite` table. All the data in the column will be lost.
  - You are about to drop the column `sequenceType` on the `Kumite` table. All the data in the column will be lost.
  - You are about to drop the column `strikeZones` on the `Kumite` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "IndicatorOnKumite" ADD COLUMN     "distance" TEXT,
ADD COLUMN     "evaluation" TEXT,
ADD COLUMN     "informalWarnings" TEXT,
ADD COLUMN     "kumiteEnding" TEXT,
ADD COLUMN     "kumiteType" TEXT,
ADD COLUMN     "levelOfPreparation" TEXT,
ADD COLUMN     "motorSequence" TEXT,
ADD COLUMN     "officialWarnings" TEXT,
ADD COLUMN     "partialTimes" TEXT,
ADD COLUMN     "penalties" TEXT,
ADD COLUMN     "sequenceType" TEXT,
ADD COLUMN     "strikeZones" TEXT;

-- AlterTable
ALTER TABLE "Kumite" DROP COLUMN "distance",
DROP COLUMN "evaluation",
DROP COLUMN "informalWarnings",
DROP COLUMN "kumiteEnding",
DROP COLUMN "kumiteType",
DROP COLUMN "levelOfPreparation",
DROP COLUMN "motorSequence",
DROP COLUMN "officialWarnings",
DROP COLUMN "partialTimes",
DROP COLUMN "penalties",
DROP COLUMN "sequenceType",
DROP COLUMN "strikeZones";
