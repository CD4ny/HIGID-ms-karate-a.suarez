-- CreateTable
CREATE TABLE "Indicator" (
    "id" SERIAL NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "actionType" TEXT NOT NULL,
    "deleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Indicator_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Karateca" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "sex" TEXT NOT NULL,
    "weight" DOUBLE PRECISION NOT NULL,
    "category" TEXT NOT NULL,
    "file" TEXT,
    "deleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Karateca_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CompetitiveActivity" (
    "id" SERIAL NOT NULL,
    "desc" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "startDate" TIMESTAMP(3),
    "endDate" TIMESTAMP(3),
    "deleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "CompetitiveActivity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CompetitiveActivityKarateca_Kumite" (
    "id" SERIAL NOT NULL,
    "deleted" BOOLEAN NOT NULL DEFAULT false,
    "karatecaId" INTEGER NOT NULL,
    "activityId" INTEGER NOT NULL,

    CONSTRAINT "CompetitiveActivityKarateca_Kumite_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Kumite" (
    "id" SERIAL NOT NULL,
    "gi" TEXT NOT NULL,
    "evaluation" TEXT,
    "kumiteType" TEXT,
    "distance" TEXT,
    "sequenceType" TEXT,
    "strikeZones" TEXT,
    "partialTimes" TEXT,
    "levelOfPreparation" TEXT,
    "motorSequence" TEXT,
    "kumiteEnding" TEXT,
    "informalWarnings" TEXT,
    "officialWarnings" TEXT,
    "penalties" TEXT,
    "deleted" BOOLEAN NOT NULL DEFAULT false,
    "comp_Karat_Id" INTEGER NOT NULL,

    CONSTRAINT "Kumite_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "IndicatorOnKumite" (
    "id" SERIAL NOT NULL,
    "value" TEXT,
    "deleted" BOOLEAN NOT NULL DEFAULT false,
    "indicatorId" INTEGER NOT NULL,
    "kumiteId" INTEGER NOT NULL,

    CONSTRAINT "IndicatorOnKumite_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "CompetitiveActivityKarateca_Kumite" ADD CONSTRAINT "CompetitiveActivityKarateca_Kumite_karatecaId_fkey" FOREIGN KEY ("karatecaId") REFERENCES "Karateca"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CompetitiveActivityKarateca_Kumite" ADD CONSTRAINT "CompetitiveActivityKarateca_Kumite_activityId_fkey" FOREIGN KEY ("activityId") REFERENCES "CompetitiveActivity"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Kumite" ADD CONSTRAINT "Kumite_comp_Karat_Id_fkey" FOREIGN KEY ("comp_Karat_Id") REFERENCES "CompetitiveActivityKarateca_Kumite"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IndicatorOnKumite" ADD CONSTRAINT "IndicatorOnKumite_indicatorId_fkey" FOREIGN KEY ("indicatorId") REFERENCES "Indicator"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IndicatorOnKumite" ADD CONSTRAINT "IndicatorOnKumite_kumiteId_fkey" FOREIGN KEY ("kumiteId") REFERENCES "Kumite"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
