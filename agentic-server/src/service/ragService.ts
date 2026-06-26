import RAGRepository from "../repository/ragRepository"

export default class RagService {
    static get() {
        return RAGRepository.data;
    }
}