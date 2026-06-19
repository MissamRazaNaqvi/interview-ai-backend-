import mongoose from "mongoose";

const blackListTokenSchema = mongoose.Schema({
    token:{
        type:String,
        required:[true,"token require for black listing"]
    }
})

export const blackListTokenModel = mongoose.model('blacklisttoken',blackListTokenSchema)