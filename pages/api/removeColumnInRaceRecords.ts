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
    const { columnName, columnType } = req.body;

   // Remove column query
    await prisma.$executeRawUnsafe(`ALTER TABLE "public"."RaceRecords" DROP COLUMN "${columnName}"`)

    console.log('Column Removed');
    res.status(200).end();
  } catch (error) {
    res.status(500).json({ error: 'Error removing column' });
  } finally {
    await prisma.$disconnect();
  }
}
