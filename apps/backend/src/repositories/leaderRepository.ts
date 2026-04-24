import type { Leadership } from "../types/Leader";
import { getPrisma } from "../lib/prisma";

interface LeaderWithRole {
  firstName: string;
  lastName: string;
  role: {
    title: string;
  };
}

const mapLeader = (leader: LeaderWithRole): Leadership => {
  return {
    firstName: leader.firstName,
    lastName: leader.lastName,
    role: leader.role.title,
  };
};

export const getLeaders = async (): Promise<Leadership[]> => {
  const prisma = getPrisma();
  const leaders = await prisma.leader.findMany({
    orderBy: { id: "asc" },
    include: { role: true },
  });

  return leaders.map(mapLeader);
};

export const roleOccupied = async (role: string): Promise<boolean> => {
  const prisma = getPrisma();
  const existingRole = await prisma.role.findFirst({
    where: {
      title: {
        equals: role,
        mode: "insensitive",
      },
    },
    include: {
      leader: true,
    },
  });

  return existingRole !== null && existingRole.leader !== null;
};

export const addLeader = async (leader: Leadership): Promise<Leadership[]> => {
  const prisma = getPrisma();
  const existingRole = await prisma.role.findFirst({
    where: {
      title: {
        equals: leader.role,
        mode: "insensitive",
      },
    },
  });

  if (existingRole) {
    await prisma.leader.create({
      data: {
        firstName: leader.firstName,
        lastName: leader.lastName,
        roleId: existingRole.id,
      },
    });
  } else {
    await prisma.role.create({
      data: {
        title: leader.role,
        leader: {
          create: {
            firstName: leader.firstName,
            lastName: leader.lastName,
          },
        },
      },
    });
  }

  return getLeaders();
};
