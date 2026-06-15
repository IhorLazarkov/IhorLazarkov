import http from 'node:http'
import { type IController } from '../controllers/serverRouter';


export default class TestController implements IController {

    GET(req: http.IncomingMessage, res: http.ServerResponse<http.IncomingMessage>) {
        res.setHeader('Content-Type', 'application/json');
        res.statusCode = 200;
        res.end(JSON.stringify({ response: 'Success' }));
    }

    POST(req: http.IncomingMessage, res: http.ServerResponse<http.IncomingMessage>, body: string) {
        res.setHeader('Content-Type', 'application/json');
        res.statusCode = 201;
        res.end(JSON.stringify({body}))
    };

    PUT(req: http.IncomingMessage, res: http.ServerResponse<http.IncomingMessage>) {
        res.statusCode = 405;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ message: 'PUT is not supported' }))
    };

    DELETE(req: http.IncomingMessage, res: http.ServerResponse<http.IncomingMessage>) {
        res.statusCode = 405;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ message: 'DELETE is not supported' }))
    };

    OPTIONS(req: http.IncomingMessage, res: http.ServerResponse<http.IncomingMessage>) {
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ response: 'Success' }));
    };
}

