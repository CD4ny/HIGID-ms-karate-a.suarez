-- CreateTable
CREATE TABLE "Indicator" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "actionType" TEXT NOT NULL,

    CONSTRAINT "Indicator_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Karateca" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "weight" DOUBLE PRECISION NOT NULL,
    "category" TEXT NOT NULL,
    "file" TEXT,

    CONSTRAINT "Karateca_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CompetitiveActivity" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "desc" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "startDate" TIMESTAMP(3),
    "endDate" TIMESTAMP(3),

    CONSTRAINT "CompetitiveActivity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CompetitiveActivityOnKarateca" (
    "id" SERIAL NOT NULL,
    "karatecaId" INTEGER NOT NULL,
    "activityId" INTEGER NOT NULL,

    CONSTRAINT "CompetitiveActivityOnKarateca_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Kumite" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "desc" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "startDate" TIMESTAMP(3),
    "endDate" TIMESTAMP(3),
    "karatecaId" INTEGER NOT NULL,
    "competitiveActivityId" INTEGER NOT NULL,

    CONSTRAINT "Kumite_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "IndicatorOnKumite" (
    "id" SERIAL NOT NULL,
    "value" TEXT NOT NULL,
    "indicatorId" INTEGER NOT NULL,
    "kumiteId" INTEGER NOT NULL,

    CONSTRAINT "IndicatorOnKumite_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "CompetitiveActivityOnKarateca" ADD CONSTRAINT "CompetitiveActivityOnKarateca_karatecaId_fkey" FOREIGN KEY ("karatecaId") REFERENCES "Karateca"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CompetitiveActivityOnKarateca" ADD CONSTRAINT "CompetitiveActivityOnKarateca_activityId_fkey" FOREIGN KEY ("activityId") REFERENCES "CompetitiveActivity"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Kumite" ADD CONSTRAINT "Kumite_karatecaId_fkey" FOREIGN KEY ("karatecaId") REFERENCES "Karateca"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Kumite" ADD CONSTRAINT "Kumite_competitiveActivityId_fkey" FOREIGN KEY ("competitiveActivityId") REFERENCES "CompetitiveActivity"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IndicatorOnKumite" ADD CONSTRAINT "IndicatorOnKumite_indicatorId_fkey" FOREIGN KEY ("indicatorId") REFERENCES "Indicator"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IndicatorOnKumite" ADD CONSTRAINT "IndicatorOnKumite_kumiteId_fkey" FOREIGN KEY ("kumiteId") REFERENCES "Kumite"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
