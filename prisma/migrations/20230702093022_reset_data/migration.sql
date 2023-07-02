-- AlterTable
CREATE SEQUENCE racerecords_id_seq;
ALTER TABLE "RaceRecords" ALTER COLUMN "id" SET DEFAULT nextval('racerecords_id_seq');
ALTER SEQUENCE racerecords_id_seq OWNED BY "RaceRecords"."id";
