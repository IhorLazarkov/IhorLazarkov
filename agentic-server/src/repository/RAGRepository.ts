import fs from 'node:fs'

export default class RAGRepository {
  static #data: string | undefined

  static get data() {

    if(!this.#data) {
        this.#data = fs.readFileSync('./info.json', 'utf-8');
    }
    return this.#data;
  }
}