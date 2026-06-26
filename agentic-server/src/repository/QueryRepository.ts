import { type queriesModel as TQuery } from "../../generated/prisma/models";
import { prisma } from "../../lib/prisma";

export default class QueryRepository {
  async create(body: string): Promise<TQuery> {
    return await prisma.queries.create({
      data: { body },
    });
  }

  async findAll(): Promise<TQuery[]> {
    return await prisma.queries.findMany();
  }

  async findById(id: number): Promise<TQuery | null> {
    return await prisma.queries.findUnique({
      where: { id },
    });
  }

  async findTopQueries(): Promise<
    { body: string; _count: { body: number } }[]
  > {
    // "Select body, count(body) as times from queries group by body Order by 'times' asc limit 5;"
    return await prisma.queries.groupBy({
      by: ["body"],
      _count: {
        body: true,
      },
      orderBy: {
        _count: {
          body: "desc",
        },
      },
      take: 5,
    });
  }

  async update(id: number, body: string): Promise<TQuery> {
    return await prisma.queries.update({
      where: { id },
      data: { body },
    });
  }

  async delete(id: number): Promise<TQuery> {
    return await prisma.queries.delete({
      where: { id },
    });
  }
}
