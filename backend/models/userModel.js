import { getDatabase } from "../config/database.js";

export async function usersCollection() {

    const db = await getDatabase();

    const collection = db.collection("users");

    await collection.createIndex({ email: 1 }, { unique: true });

    return collection;

}