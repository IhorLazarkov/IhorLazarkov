import dotenv from 'dotenv'
const envpath = process.env["NODE_ENV"] === 'test' ? '.env.test' : '.env'
dotenv.config({path: envpath})

const PORT = process.env.PORT || 3007
const HOST = process.env.HOST || '127.0.0.1'
import Server from "./src/server"
import lmsRouter from "./src/controllers/lmsRouter"

function main(){
    const server = new Server(new lmsRouter(), PORT, HOST)
    server.start()
    
    process.on('SIGINT', () => {
        server.stop()    
    })
}

main()