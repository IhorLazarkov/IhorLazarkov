import { CacheRepository } from "../repository/cacheRepository"; // Assuming you have this imported
import { type CacheModel as TCache } from "../../generated/prisma/models/Cache";

export default class CacheService {
  private cacheRepository: CacheRepository;

  constructor() {
    this.cacheRepository = new CacheRepository();
  }

  // Create a new cache entry by writing to DB
  async create(cache: {
    queries_id: number;
    response: string;
  }): Promise<TCache> {
    return await this.cacheRepository.create(cache);
  }

  // Read a cache entry by reading from DB
  async read(query_id: number): Promise<TCache | null> {
    return await this.cacheRepository.findByQueriesId(query_id);
  }
}
