/*
  Warnings:

  - Added the required column `distance` to the `Kumite` table without a default value. This is not possible if the table is not empty.
  - Added the required column `evaluation` to the `Kumite` table without a default value. This is not possible if the table is not empty.
  - Added the required column `informalWarnings` to the `Kumite` table without a default value. This is not possible if the table is not empty.
  - Added the required column `kumiteEnding` to the `Kumite` table without a default value. This is not possible if the table is not empty.
  - Added the required column `kumiteType` to the `Kumite` table without a default value. This is not possible if the table is not empty.
  - Added the required column `levelOfPreparation` to the `Kumite` table without a default value. This is not possible if the table is not empty.
  - Added the required column `motorSequence` to the `Kumite` table without a default value. This is not possible if the table is not empty.
  - Added the required column `officialWarnings` to the `Kumite` table without a default value. This is not possible if the table is not empty.
  - Added the required column `partialTimes` to the `Kumite` table without a default value. This is not possible if the table is not empty.
  - Added the required column `penalties` to the `Kumite` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sectionType` to the `Kumite` table without a default value. This is not possible if the table is not empty.
  - Added the required column `strikeZones` to the `Kumite` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Kumite" ADD COLUMN     "distance" TEXT NOT NULL,
ADD COLUMN     "evaluation" TEXT NOT NULL,
ADD COLUMN     "informalWarnings" TEXT NOT NULL,
ADD COLUMN     "kumiteEnding" TEXT NOT NULL,
ADD COLUMN     "kumiteType" TEXT NOT NULL,
ADD COLUMN     "levelOfPreparation" TEXT NOT NULL,
ADD COLUMN     "motorSequence" TEXT NOT NULL,
ADD COLUMN     "officialWarnings" TEXT NOT NULL,
ADD COLUMN     "partialTimes" TEXT NOT NULL,
ADD COLUMN     "penalties" TEXT NOT NULL,
ADD COLUMN     "sectionType" TEXT NOT NULL,
ADD COLUMN     "strikeZones" TEXT NOT NULL;
