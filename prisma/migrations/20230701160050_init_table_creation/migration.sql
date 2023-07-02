-- CreateTable
CREATE TABLE "Users" (
    "id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Race" (
    "id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Race_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RaceRecords" (
    "id" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "raceId" INTEGER NOT NULL,
    "columnName" TEXT NOT NULL,
    "columnData" INTEGER NOT NULL,

    CONSTRAINT "RaceRecords_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "RaceRecords" ADD CONSTRAINT "RaceRecords_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RaceRecords" ADD CONSTRAINT "RaceRecords_raceId_fkey" FOREIGN KEY ("raceId") REFERENCES "Race"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
