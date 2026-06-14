import RAGRepository from "../repository/RAGRepository"

export default class RagService {
    static get() {
        return RAGRepository.data;
    }
}