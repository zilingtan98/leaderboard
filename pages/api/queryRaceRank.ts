import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

/**
 * 
 * @param  {NextApiRequest} req
 * @param  {NextApiResponse} res
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const colArr = req.query['colArr[]'] || [];
    const conditionArr = req.query['conditionArr[]'] || [];
    const possibleLen = colArr?.length || 0;
    let constructSelectStr = "";
    let constructOrderStr = "";
    if (possibleLen > 0){
        for (let i = 0; i < possibleLen; i ++){
            constructSelectStr += `CAST(SUM("public"."RaceRecords"."${colArr[i]}") AS INTEGER) AS "${colArr[i]}"`
            constructOrderStr += `SUM("public"."RaceRecords"."${colArr[i]}") ${conditionArr[i]}`
            if (i !== possibleLen - 1) {
                constructSelectStr += ', ';
                constructOrderStr += ', ';
              }
        }
    }

    const response = await prisma.$queryRawUnsafe(`
      SELECT "public"."Users".Name, ${constructSelectStr}
      FROM "public"."RaceRecords" 
      LEFT JOIN "public"."Users" ON "public"."RaceRecords"."userId" = "public"."Users"."id" 
      GROUP BY "public"."Users".Name
      ORDER BY ${constructOrderStr}
    `);

    res.status(200).json(response);
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Error querying table' });
  } finally {
    await prisma.$disconnect();
  }
}
