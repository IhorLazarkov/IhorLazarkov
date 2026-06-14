import { prisma } from "../../lib/prisma";

export class CacheRepository {
  async create({
    queries_id,
    enquiry,
    response,
  }: {
    queries_id: number;
    enquiry: string;
    response: string;
  }) {
    return await prisma.cache.create({
      data: {
        queries_id,
        enquiry,
        response,
      },
    });
  }

  async findByQueriesId(queries_id: number) {
    return await prisma.cache.findFirst({
      where: { queries_id },
      select: {
        id: true,
        enquiry: true,
        response: true,
        createdAt: true,
      },
    });
  }

  async findAll() {
    return await prisma.cache.findMany({
      select: {
        id: true,
        enquiry: true,
        response: true,
        createdAt: true,
      },
    });
  }

  async deleteById(id: number) {
    return await prisma.cache.delete({
      where: { id },
    });
  }
}
