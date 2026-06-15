import type { IncomingMessage, ServerResponse } from "node:http";
import IController  from "./defaultRouter";

export default class OllamaRouter implements IController{
    GET(req: IncomingMessage, res: ServerResponse<IncomingMessage>): void {
        throw new Error("Method not implemented.");
    }
    POST(req: IncomingMessage, res: ServerResponse<IncomingMessage>, body: string): void {
        throw new Error("Method not implemented.");
    }
    PUT(req: IncomingMessage, res: ServerResponse<IncomingMessage>): void {
        throw new Error("Method not implemented.");
    }
    DELETE(req: IncomingMessage, res: ServerResponse<IncomingMessage>): void {
        throw new Error("Method not implemented.");
    }
    OPTIONS(req: IncomingMessage, res: ServerResponse<IncomingMessage>): void {
        throw new Error("Method not implemented.");
    }

}