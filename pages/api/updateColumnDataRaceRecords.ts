import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

/**
 * This function updates the specified column in the `RaceRecords` table.
 * @param  {NextApiRequest} req
 * @param  {NextApiResponse} res
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { columnName, raceId, userId, value } = req.body;

    const response =  await prisma.$executeRawUnsafe(`UPDATE "public"."RaceRecords" SET "${columnName}" = ${value} WHERE "raceId" = ${raceId} AND "userId" = ${userId}`)

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: 'Error adding column' });
  } finally {
    await prisma.$disconnect();
  }
}

