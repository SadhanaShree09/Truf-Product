import { authRoutes } from "./authRoutes.js";
import { turfRoutes } from "./turfRoutes.js";
import { bookingRoutes } from "./bookingRoutes.js";
// import { dashboardRoutes } from "./dashboardRoutes.js";

export async function routes(req,res){

    if(await authRoutes(req,res))
        return true;

    if(await turfRoutes(req,res))
        return true;

    if(await bookingRoutes(req,res))
        return true;

    // if(await dashboardRoutes(req,res))
    //     return true;

    return false;

}