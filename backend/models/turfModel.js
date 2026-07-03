import { getDatabase } from "../config/database.js";

export async function turfsCollection() {

    const db = await getDatabase();

    const collection = db.collection("turfs");

    return collection;

}
