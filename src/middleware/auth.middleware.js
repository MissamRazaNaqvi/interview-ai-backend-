import { blackListTokenModel } from "../models/blackListToken.model.js";
import { userModel } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";

const verifyToken = asyncHandler(async (req, res, next) => {

    console.log(req.cookies, "verify")

    try {
        const token = req.cookies?.token || req.header("authorization")?.replace("Bearer ", "")

        // console.log(token, "token")

        if (!token || token === "undefined" || token === "null") {
            throw new ApiError(401, "Unauthorized request");
        }

        const isTokenBlackListed = await blackListTokenModel.findOne({ token })

        if (isTokenBlackListed) {
            return new ApiError(401, "invalid token")
        }

        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

        // console.log(decodedToken, "decodedToken")

        const user = await userModel.findById(decodedToken?.id).select("-password -refreshToken")

        console.log(user, "user")

        if (!user) {
            // todo discuss about frontend
            return new ApiError(400, "Invalid Access Token")
        }

        req.user = user;

        next()
    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid Access Token")
    }

})

export { verifyToken }