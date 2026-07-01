import * as authController from "../controllers/authController.js";

export async function authRoutes(req,res){

    if(req.url==="/api/auth/register" && req.method==="POST"){

        return authController.register(req,res);

    }

    if(req.url==="/api/auth/login" && req.method==="POST"){

        return authController.login(req,res);

    }

    return false;

}