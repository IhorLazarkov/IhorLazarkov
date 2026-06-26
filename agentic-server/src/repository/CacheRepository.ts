import { prisma } from "../../lib/prisma";
import { type CacheModel as TCache } from "../../generated/prisma/models/Cache";

export class CacheRepository {
  async create({
    queries_id,
    response,
  }: {
    queries_id: number;
    response: string;
  }): Promise<TCache> {
    return await prisma.cache.create({
      data: {
        queries_id,
        response,
      },
    });
  }

  async findByQueriesId(queries_id: number): Promise<TCache | null> {
    return (await prisma.cache.findFirst({
      where: { queries_id },
      select: {
        id: true,
        response: true,
        createdAt: true,
      },
    })) as TCache | null;
  }

  async findAll(): Promise<TCache[]> {
    return (await prisma.cache.findMany({
      select: {
        id: true,
        response: true,
        createdAt: true,
      },
    })) as TCache[];
  }

  async deleteById(id: number): Promise<TCache> {
    return await prisma.cache.delete({
      where: { id },
    });
  }
}
