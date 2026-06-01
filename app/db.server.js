import { PrismaClient } from "@prisma/client";

const createPrismaClient = () => new PrismaClient();

if (!global.prismaGlobal) {
  global.prismaGlobal = createPrismaClient();
}

const prisma = global.prismaGlobal;

export default prisma;
