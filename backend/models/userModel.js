import { getDatabase } from "../config/database.js";

export async function usersCollection() {

    const db = await getDatabase();

    const collection = db.collection("users");

    await collection.createIndex({ email: 1 }, { unique: true });

    const indexes = await collection.indexes();
    const usernameIndex = indexes.find((index) => index.name === "username_1");

    if (usernameIndex && !usernameIndex.partialFilterExpression) {
        await collection.dropIndex("username_1");
    }

    await collection.createIndex(
        { username: 1 },
        {
            name: "username_1",
            unique: true,
            partialFilterExpression: {
                username: { $type: "string" }
            }
        }
    );

    return collection;

}