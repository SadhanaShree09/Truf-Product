import * as turfController from "../controllers/turfController.js";

export async function turfRoutes(req, res) {

    const url = new URL(req.url, `http://${req.headers.host}`);
    const path = url.pathname;

    if (path === "/api/turfs" && req.method === "GET") {

        await turfController.getAllTurfs(req, res);
        return true;

    }

    const turfByIdMatch = path.match(/^\/api\/turfs\/([a-f0-9]{24})$/i);

    if (turfByIdMatch && req.method === "GET") {

        await turfController.getTurfById(req, res, turfByIdMatch[1]);
        return true;

    }

    return false;

}
