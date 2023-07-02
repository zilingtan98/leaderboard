import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

interface RaceData {
  id: number;
  name: string;
}

interface UserData {
  id: number;
  name: string;
}

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const raceData: RaceData[] = await prisma.race.findMany({
      select: {
        id: true,
        name: true,
      },
      orderBy: {
        id: 'asc',
      },
    });

    const userData: UserData[] = await prisma.users.findMany({
      select: {
        id: true,
        name: true,
      },
    });

    res.status(200).json({ raceData, userData });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch race and user data' });
  }
}
