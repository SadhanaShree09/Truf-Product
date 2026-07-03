import { parseJsonBody } from "../middleware/bodyParser.js";
import { sendJson } from "../utils/response.js";
import * as bookingService from "../services/bookingService.js";

export async function createBooking(req, res) {

    const body = await parseJsonBody(req);

    if (!body.turfId || !body.date || !body.timeSlot || !body.duration || !body.paymentMethod) {
        throw new Error("INVALID_INPUT");
    }

    const booking = await bookingService.createBooking(body);

    sendJson(res, 201, {
        message: "Booking confirmed",
        booking,
        notifications: [
            "Booking confirmation sent",
            "Reminder scheduled 30 minutes before match",
            "Booking start and end reminders scheduled"
        ]
    });

    return true;

}

export async function getBookings(req, res) {

    const bookings = await bookingService.listBookings();

    sendJson(res, 200, {
        message: "Bookings retrieved successfully",
        bookings
    });

    return true;

}
