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

    try {

        const handled=await routes(req,res);

        if(!handled){

            sendJson(res,404,{
                message:"Route Not Found"
            });

        }

    } catch (error) {

        const knownErrors = {
            EMAIL_EXISTS: 409,
            USERNAME_EXISTS: 409,
            INVALID: 401,
            INVALID_INPUT: 400,
            NOT_FOUND: 404
        };

        const status = knownErrors[error?.message] || 500;
        const message = error?.message === "INVALID"
            ? "Invalid username/email or password"
            : error?.message === "INVALID_INPUT"
                ? "Missing required fields"
                : error?.message === "EMAIL_EXISTS"
                    ? "Email already exists"
                    : error?.message === "USERNAME_EXISTS"
                        ? "Username already exists"
                        : error?.message === "NOT_FOUND"
                            ? "Resource not found"
                        : "Internal Server Error";

        if (!res.headersSent) {
            sendJson(res, status, { message });
        }

    }

});

server.listen(env.PORT,()=>{

    console.log(`Server Running on ${env.PORT}`);

});