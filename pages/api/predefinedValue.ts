import { NextApiRequest, NextApiResponse } from "next";
import { Prisma, PrismaClient } from "@prisma/client";
import { Sql } from "@prisma/client/runtime/library";

const prisma = new PrismaClient();
interface RaceData {
  id: number;
  name: string;
}
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
