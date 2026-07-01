import { MongoClient } from "mongodb";
import env from "./env.js";

let client;

export async function getDatabase() {

    if (!client) {

        client = new MongoClient(env.MONGODB_URI);

        await client.connect();
    }

    return client.db(env.DATABASE_NAME);

}