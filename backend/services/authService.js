import { usersCollection } from "../models/userModel.js";
import { hashPassword, verifyPassword } from "../utils/password.js";

export async function register(name, email, password){

    const users = await usersCollection();

    const exists = await users.findOne({email});

    if(exists)
        throw new Error("EMAIL_EXISTS");

    const user={

        name,

        email,

        passwordHash:hashPassword(password),

        createdAt:new Date()

    };

    const result=await users.insertOne(user);

    return {...user,_id:result.insertedId};

}

export async function login(email,password){

    const users=await usersCollection();

    const user=await users.findOne({email});

    if(!user)
        throw new Error("INVALID");

    if(!verifyPassword(password,user.passwordHash))
        throw new Error("INVALID");

    return user;

}