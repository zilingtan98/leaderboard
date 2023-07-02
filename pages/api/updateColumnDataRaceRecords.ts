import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { columnName, raceId, userId, value } = req.body;

    const response =  await prisma.$executeRawUnsafe(`UPDATE "public"."RaceRecords" SET "${columnName}" = ${value} WHERE "raceId" = ${raceId} AND "userId" = ${userId}`)


    console.log('New column added successfully and updated with default value');
    res.status(200).json(response);
  } catch (error) {
    console.error('Error adding column:', error);
    res.status(500).json({ error: 'Error adding column' });
  } finally {
    await prisma.$disconnect();
  }
}
