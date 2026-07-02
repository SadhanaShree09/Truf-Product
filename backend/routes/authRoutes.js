import * as authController from "../controllers/authController.js";

export async function authRoutes(req,res){

    if(req.url==="/api/auth/register" && req.method==="POST"){

        await authController.register(req,res);
        return true;

    }

    if(req.url==="/api/auth/login" && req.method==="POST"){

        await authController.login(req,res);
        return true;

    }

    return false;

}