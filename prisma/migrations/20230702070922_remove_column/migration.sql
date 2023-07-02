/*
  Warnings:

  - You are about to drop the column `columnData` on the `RaceRecords` table. All the data in the column will be lost.
  - You are about to drop the column `columnName` on the `RaceRecords` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "RaceRecords" DROP COLUMN "columnData",
DROP COLUMN "columnName";
