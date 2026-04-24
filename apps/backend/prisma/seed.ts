import "../src/config/env";
import { prisma } from "../src/lib/prisma";
import { initialDepartments } from "../src/data/departments";
import { initialLeaders } from "../src/data/leaders";

const main = async () => {
  await prisma.leader.deleteMany();
  await prisma.role.deleteMany();
  await prisma.employee.deleteMany();
  await prisma.department.deleteMany();

  for (const department of initialDepartments) {
    await prisma.department.create({
      data: {
        name: department.name,
        employees: {
          create: department.employees.map((employee) => ({
            firstName: employee.firstName,
            lastName: employee.lastName ?? null,
          })),
        },
      },
    });
  }

  for (const leader of initialLeaders) {
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
};

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
