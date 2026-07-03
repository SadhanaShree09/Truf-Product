import * as bookingController from "../controllers/bookingController.js";

export async function bookingRoutes(req, res) {

    if (req.url === "/api/bookings" && req.method === "GET") {
        return bookingController.getBookings(req, res);
    }

    if (req.url === "/api/bookings" && req.method === "POST") {
        return bookingController.createBooking(req, res);
    }

    return false;

}
