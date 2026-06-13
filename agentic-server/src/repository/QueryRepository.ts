import { type queriesModel as TQuery } from "../../generated/prisma/models";
import {prisma} from "../../lib/prisma"

export default class QueryRepository {

  async create(body: string): Promise<TQuery> {
    return await prisma.queries.create({
      data: { body }
    });
  }

  async findAll(): Promise<TQuery[]> {
    return await prisma.queries.findMany();
  }

  async findById(id: number): Promise<TQuery | null> {
    return await prisma.queries.findUnique({
      where: { id }
    });
  }

  async update(id: number, body: string): Promise<TQuery> {
    return await prisma.queries.update({
      where: { id },
      data: { body }
    });
  }

  async delete(id: number): Promise<TQuery> {
    return await prisma.queries.delete({
      where: { id }
    });
  }

}