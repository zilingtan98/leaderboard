import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

/**
 * This function creates predefined users, races, and race records in the database.
 * The function first creates an array of predefined users, races, and race records. 
 * Then, it uses the `prisma.users.createMany()`, `prisma.race.createMany()`, and 
 * `prisma.raceRecords.createMany()` methods to create the data in the database. 
 * Finally, the function disconnects from Prisma.
 * @param  {NextApiRequest} req
 * @param  {NextApiResponse} res
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const predefinedUsers = [
    { id: 0, name: "Alice" },
    { id: 1, name: "Bob" },
    { id: 2, name: "John" },
  ];

  const predefinedRace = [
    { id: 0, name: "Race 1" },
    { id: 1, name: "Race 2" },
    { id: 2, name: "Race 3" },
  ];

  const predefinedRecords = [];
  let currentId = 0;
  for (let i = 0; i < predefinedUsers.length; i++) {
    for (let j = 0; j < predefinedRace.length; j++) {
      const record = {
        id: currentId,
        userId: i,
        raceId: j,
      };
      predefinedRecords.push(record);
      currentId++;
    }
  }
  try {
    await prisma.users.createMany({
      data: predefinedUsers,
      skipDuplicates: true,
    });
    await prisma.race.createMany({
      data: predefinedRace,
      skipDuplicates: true,
    });
    await prisma.raceRecords.createMany({
      data: predefinedRecords,
      skipDuplicates: true,
    });
    res.status(200).end();
  } catch (error) {
    res.status(500).json({ error: "Unable to create" });
  } finally {
    await prisma.$disconnect();
  }
}
