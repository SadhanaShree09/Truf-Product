import { turfsCollection } from "../models/turfModel.js";
import { ObjectId } from "mongodb";

export async function getAllTurfs() {

    const turfs = await turfsCollection();

    return await turfs.find({}).toArray();

}

export async function getTurfById(id) {

    const turfs = await turfsCollection();

    if (!ObjectId.isValid(id))
        return null;

    return await turfs.findOne({ _id: new ObjectId(id) });

}
