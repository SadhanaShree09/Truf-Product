import http from "node:http";

import env from "./config/env.js";

import { routes } from "./routes/index.js";

import { sendJson } from "./utils/response.js";

const server=http.createServer(async(req,res)=>{

    if(req.method==="OPTIONS"){

        res.writeHead(204,{
            "Access-Control-Allow-Origin":"*",
            "Access-Control-Allow-Methods":"GET,POST,PUT,DELETE",
            "Access-Control-Allow-Headers":"Content-Type"
        });

        return res.end();

    }

    const handled=await routes(req,res);

    if(!handled){

        sendJson(res,404,{
            message:"Route Not Found"
        });

    }

});

server.listen(env.PORT,()=>{

    console.log(`Server Running on ${env.PORT}`);

});