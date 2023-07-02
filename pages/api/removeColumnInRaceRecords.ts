import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

/**
 * This function removes the specified column from the `RaceRecords` table.
 * @param  {NextApiRequest} req
 * @param  {NextApiResponse} res
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { columnName, columnType } = req.body;

   // Remove column query
    await prisma.$executeRawUnsafe(`ALTER TABLE "public"."RaceRecords" DROP COLUMN "${columnName}"`)

    res.status(200).end();
  } catch (error) {
    res.status(500).json({ error: 'Error removing column' });
  } finally {
    await prisma.$disconnect();
  }
}
