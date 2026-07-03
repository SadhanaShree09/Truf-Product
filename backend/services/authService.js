import { usersCollection } from "../models/userModel.js";
import { hashPassword, verifyPassword } from "../utils/password.js";

function assignRole(username) {
    return username.toLowerCase() === "admin" ? "admin" : "user";
}

function toPublicUser(user) {
    const { passwordHash, ...safeUser } = user;
    return safeUser;
}

export async function register(name, username, email, password){

    if (!name || !username || !email || !password)
        throw new Error("INVALID_INPUT");

    const users = await usersCollection();

    const normalizedEmail = email.trim().toLowerCase();
    const normalizedUsername = username.trim().toLowerCase();

    const existsByEmail = await users.findOne({ email: normalizedEmail });
    const existsByUsername = await users.findOne({ username: normalizedUsername });

    if(existsByEmail)
        throw new Error("EMAIL_EXISTS");

    if(existsByUsername)
        throw new Error("USERNAME_EXISTS");

    const user={

        name,

        username: normalizedUsername,

        email: normalizedEmail,

        role: assignRole(normalizedUsername),

        passwordHash:hashPassword(password),

        createdAt:new Date()

    };

    const result=await users.insertOne(user);

    return toPublicUser({ ...user, _id: result.insertedId });

}

export async function login(identifier,password){

    if (!identifier || !password)
        throw new Error("INVALID");

    const users=await usersCollection();

    const credential = identifier.trim().toLowerCase();

    const user=await users.findOne({
        $or: [
            { email: credential },
            { username: credential }
        ]
    });

    if(!user)
        throw new Error("INVALID");

    if(!verifyPassword(password,user.passwordHash))
        throw new Error("INVALID");

    return toPublicUser(user);

}
