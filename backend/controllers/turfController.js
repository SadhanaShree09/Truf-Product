import { sendJson } from "../utils/response.js";
import * as turfService from "../services/turfService.js";

export async function getAllTurfs(req, res) {

    const turfs = await turfService.getAllTurfs();

    sendJson(res, 200, {
        message: "Turfs retrieved successfully",
        turfs
    });

    return true;

}

export async function getTurfById(req, res, turfId) {

    const turf = await turfService.getTurfById(turfId);

    if (!turf)
        throw new Error("NOT_FOUND");

    sendJson(res, 200, {
        message: "Turf retrieved successfully",
        turf
    });

    return true;

}
