import { bookingsCollection } from "../models/bookingModel.js";

function buildBookingId() {
    return `BK-${Date.now()}-${Math.floor(Math.random() * 900 + 100)}`;
}

function parseDateTime(date, timeSlot) {
    const [start] = String(timeSlot || "").split("-");
    if (!date || !start) return null;
    return new Date(`${date}T${start}:00`);
}

function getStatusFromDate(date, timeSlot, currentStatus = "confirmed") {
    if (currentStatus === "cancelled") return "cancelled";

    const startAt = parseDateTime(date, timeSlot);
    if (!startAt || Number.isNaN(startAt.getTime())) return "confirmed";

    return startAt.getTime() > Date.now() ? "upcoming" : "completed";
}

export async function createBooking(payload) {

    const bookings = await bookingsCollection();

    const booking = {
        bookingId: buildBookingId(),
        turfId: payload.turfId,
        turfName: payload.turfName,
        location: payload.location,
        date: payload.date,
        timeSlot: payload.timeSlot,
        duration: Number(payload.duration),
        paymentMethod: payload.paymentMethod,
        amount: payload.amount,
        status: "confirmed",
        createdAt: new Date()
    };

    const result = await bookings.insertOne(booking);

    return { ...booking, _id: result.insertedId };

}

export async function listBookings() {

    const bookings = await bookingsCollection();

    const rows = await bookings.find({}).sort({ createdAt: -1 }).toArray();

    return rows.map((row) => ({
        ...row,
        status: getStatusFromDate(row.date, row.timeSlot, row.status)
    }));

}
