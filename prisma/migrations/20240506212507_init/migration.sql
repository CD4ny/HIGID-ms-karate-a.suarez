-- AlterTable
ALTER TABLE "CompetitiveActivity" ADD COLUMN     "deleted" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Indicator" ADD COLUMN     "deleted" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Karateca" ADD COLUMN     "deleted" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Kumite" ADD COLUMN     "deleted" BOOLEAN NOT NULL DEFAULT false;
