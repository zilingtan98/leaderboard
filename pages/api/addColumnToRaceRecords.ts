import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
/**
 * This function adds a new column to the `RaceRecords` table and updates all rows with the default value of 0.
 * The function first gets the `columnName` from the request body. Then, it uses the `prisma.$executeRawUnsafe()`
 * function to execute the following SQL queries:
 *
 * `ALTER TABLE "public"."RaceRecords" ADD COLUMN "${columnName}" INT`
 * `UPDATE "public"."RaceRecords" SET "${columnName}" = 0`
 * If the queries are successful, the function returns a status code of 200. Otherwise,
 * it returns a status code of 500 and a JSON object with the error message.
 * Finally, the function disconnects from Prisma.
 * @param  {NextApiRequest} req
 * @param  {NextApiResponse} res
 */

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { columnName } = req.body;
    console.log("columnName:", req.body);

    // Add column query
    await prisma.$executeRawUnsafe(
      `ALTER TABLE "public"."RaceRecords" ADD COLUMN "${columnName}" INT`
    );

    // Update column query
    await prisma.$executeRawUnsafe(
      `UPDATE "public"."RaceRecords" SET "${columnName}" = 0`
    );

    console.log("New column added successfully and updated with default value");
    res.status(200).end();
  } catch (error) {
    console.error("Error adding column:", error);
    res.status(500).json({ error: "Error adding column" });
  } finally {
    await prisma.$disconnect();
  }
}
