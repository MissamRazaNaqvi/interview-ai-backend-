import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: [true, "username is unique required"],
        required: true
    },
    email: {
        type: String,
        unique: [true, "email is unique required"],
        required: true
    },
    password: {
        type: String,
        required: true
    },


})

export const userModel = mongoose.model("users", userSchema)