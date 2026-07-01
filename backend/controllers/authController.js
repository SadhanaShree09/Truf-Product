import { parseJsonBody } from "../middleware/bodyParser.js";
import { sendJson } from "../utils/response.js";
import * as authService from "../services/authService.js";

export async function register(req,res){

    const body=await parseJsonBody(req);

    const user=await authService.register(
        body.name,
        body.email,
        body.password
    );

    sendJson(res,201,{
        message:"Account Created",
        user
    });

}