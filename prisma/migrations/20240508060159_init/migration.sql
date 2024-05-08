-- AlterTable
ALTER TABLE "CompetitiveActivityKarateca_Kumite" ADD COLUMN     "deleted" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "IndicatorOnKumite" ADD COLUMN     "deleted" BOOLEAN NOT NULL DEFAULT false;
