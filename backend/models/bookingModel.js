import { getDatabase } from "../config/database.js";

export async function bookingsCollection() {

    const db = await getDatabase();

    const collection = db.collection("bookings");

    await collection.createIndex({ bookingId: 1 }, { unique: true });
    await collection.createIndex({ createdAt: -1 });

    return collection;

}
