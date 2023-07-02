import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

/**
 * This function queries the `RaceRecords` and `Users` tables and returns the results in a JSON format.
 * @param  {NextApiRequest} req
 * @param  {NextApiResponse} res
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {

    const response = await prisma.$queryRawUnsafe(`
      SELECT "public"."RaceRecords".*, "public"."Users".Name
      FROM "public"."RaceRecords" 
      LEFT JOIN "public"."Users" ON "public"."RaceRecords"."userId" = "public"."Users"."id"   
    `);
    
    res.status(200).json(response);
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Error querying table' });
  } finally {
    await prisma.$disconnect();
  }
}
