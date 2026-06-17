import QueryRepository from "../repository/queryRepository";
import { type queriesModel as TQuery } from "../../generated/prisma/models/queries";
import type { group } from "node:console";

export default class QueriesService {
  private readonly repository: QueryRepository;

  constructor() {
    this.repository = new QueryRepository();
  }

  async create(body: string): Promise<TQuery> {
    return await this.repository.create(body);
  }

  async findAll(): Promise<TQuery[]> {
    return await this.repository.findAll();
  }

  async findById(id: number): Promise<TQuery | null> {
    return await this.repository.findById(id);
  }

  async findTopQueries(): Promise<TQuery[]> {
    return await this.repository.findTopQueries();
  }


  async update(id: number, body: string): Promise<TQuery> {
    return await this.repository.update(id, body);
  }

  async delete(id: number): Promise<TQuery> {
    return await this.repository.delete(id);
  }
}
