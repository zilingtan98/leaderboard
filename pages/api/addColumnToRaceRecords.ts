import { NextApiRequest, NextApiResponse } from 'next';
import { Prisma, PrismaClient } from '@prisma/client';
import { Sql } from '@prisma/client/runtime/library';

const prisma = new PrismaClient();
interface RaceData {
    id: number;
    name: string;
  }
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { columnName } = req.body;
    console.log('columnName:', req.body); 

   // Add column query
    await prisma.$executeRawUnsafe(`ALTER TABLE "public"."RaceRecords" ADD COLUMN "${columnName}" INT`)

    // Update column query
    await prisma.$executeRawUnsafe(`UPDATE "public"."RaceRecords" SET "${columnName}" = 0`)

    console.log('New column added successfully and updated with default value');
    res.status(200).end();
  } catch (error) {
    console.error('Error adding column:', error);
    res.status(500).json({ error: 'Error adding column' });
  } finally {
    await prisma.$disconnect();
  }
}
