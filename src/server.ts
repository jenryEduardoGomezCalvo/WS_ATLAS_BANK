
import http from "http";
import {app} from "./app"
import { SetUpWS } from "./infraestructure/adapters/WS";

const PORT = 3000

const server = http.createServer(app)

SetUpWS(server)

server.listen(3000,()=>{
    console.log("listening in port 3000");
})

