/*
  Warnings:

  - You are about to drop the column `competitiveActivityId` on the `Kumite` table. All the data in the column will be lost.
  - You are about to drop the column `karatecaId` on the `Kumite` table. All the data in the column will be lost.
  - You are about to drop the `CompetitiveActivityOnKarateca` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `comp_Karat_Id` to the `Kumite` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "CompetitiveActivityOnKarateca" DROP CONSTRAINT "CompetitiveActivityOnKarateca_activityId_fkey";

-- DropForeignKey
ALTER TABLE "CompetitiveActivityOnKarateca" DROP CONSTRAINT "CompetitiveActivityOnKarateca_karatecaId_fkey";

-- DropForeignKey
ALTER TABLE "Kumite" DROP CONSTRAINT "Kumite_competitiveActivityId_fkey";

-- DropForeignKey
ALTER TABLE "Kumite" DROP CONSTRAINT "Kumite_karatecaId_fkey";

-- AlterTable
ALTER TABLE "Kumite" DROP COLUMN "competitiveActivityId",
DROP COLUMN "karatecaId",
ADD COLUMN     "comp_Karat_Id" INTEGER NOT NULL;

-- DropTable
DROP TABLE "CompetitiveActivityOnKarateca";

-- CreateTable
CREATE TABLE "CompetitiveActivityKarateca_Kumite" (
    "id" SERIAL NOT NULL,
    "karatecaId" INTEGER NOT NULL,
    "activityId" INTEGER NOT NULL,

    CONSTRAINT "CompetitiveActivityKarateca_Kumite_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "CompetitiveActivityKarateca_Kumite" ADD CONSTRAINT "CompetitiveActivityKarateca_Kumite_karatecaId_fkey" FOREIGN KEY ("karatecaId") REFERENCES "Karateca"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CompetitiveActivityKarateca_Kumite" ADD CONSTRAINT "CompetitiveActivityKarateca_Kumite_activityId_fkey" FOREIGN KEY ("activityId") REFERENCES "CompetitiveActivity"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Kumite" ADD CONSTRAINT "Kumite_comp_Karat_Id_fkey" FOREIGN KEY ("comp_Karat_Id") REFERENCES "CompetitiveActivityKarateca_Kumite"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
