import fs from 'node:fs'
import path from 'node:path';
import { fileURLToPath } from 'node:url';

export default class RAGRepository {
  static #data: string | undefined

  static get data() {

    if (!this.#data) {
      const filepath = path.join(import.meta.url, "../../../info.json")
      this.#data = fs.readFileSync(fileURLToPath(filepath), 'utf-8');
    }
    return this.#data;
  }
}