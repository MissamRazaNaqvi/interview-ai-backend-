import { userModel } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js"
import bcrypt from "bcrypt";
import { ApiResponse } from "../utils/ApiResponse.js"
import jwt from "jsonwebtoken"
import { blackListTokenModel } from "../models/blackListToken.model.js"

const userRegisteration = asyncHandler(async (req, res) => {
    // get user data from clien (frontend),
    // validate data
    // check user is already exist or not
    // password hashing  using bcrypt
    // 

    const { username, email, password } = req.body;
    // console.log(userusername, email, passwordData,"userdata")

    if (!username || !email || !password) {
        throw new ApiError(400, "All fields are required");

    }

    // Check if user already exists
    const existingUser = await userModel.findOne({
        $or: [
            { username },
            { email }
        ]
    });

    if (existingUser) {
        throw new ApiError(400, "Username or email already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // console.log(hashedPassword, "hashedPassword")

    const newUser = await userModel.create({
        username: username,
        email: email,
        password: hashedPassword
    })

    // console.log(newUser,"newUser");

    if (!newUser) {
        throw new ApiError(400, "error during data storing in database");
    }

    const createdUser = await userModel
        .findById(newUser._id)
        .select("-password");

    const token = jwt.sign(
        {
            id: createdUser._id,
            username: createdUser.username,
            email: createdUser.email
        },
        process.env.JWT_SECRET,
        {
            expiresIn: process.env.JWT_EXPIRES_IN
        }
    );

    res.cookie("token", token, {
        httpOnly: true
    })

    console.log(token);

    res.status(201).json(
        new ApiResponse(200, { createdUser }, "user register successfully.")
    )

})


const userLogin = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        throw new ApiError(400, "All fields are required");
    }

    const existingUser = await userModel.findOne({ email });

    if (!existingUser) {
        throw new ApiError(409, "user not found");
    }

    const isMatch = await bcrypt.compare(
        password,
        existingUser.password
    );

    if (!isMatch) {
        throw new ApiError(409, "invalid credential.");
    }

    const token = jwt.sign(
        {
            id: existingUser._id,
            username: existingUser.username,
            email: existingUser.email
        },
        process.env.JWT_SECRET,
        {
            expiresIn: process.env.JWT_EXPIRES_IN
        }
    );

    // /Prevents JavaScript from reading the cookie. Protects against XSS attacks.
    //Cookie is sent only over HTTPS.

    res.cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "None",
        maxAge: 1000 * 60 * 60 * 24 * 7,
    })

    // console.log(token);

    const loggedUser = await userModel
        .findById(existingUser._id)
        .select("-password");

    res.status(201).json(
        new ApiResponse(200, { loggedUser, token }, "user login successfully.")
    )
})

const userLogout = asyncHandler(async (req, res) => {
    const token = req.cookies.token;

    // console.log(token,"token")

    // if(!token){
    //     throw new ApiError(400,"token not valid")
    // }

    const blackListToken = await blackListTokenModel.create({ token: token })

    if (!blackListToken) {
        throw new ApiError(401, "token black listed")
    }

    res.status(200)
        .clearCookie("token")
        .json(new ApiResponse(200, {}, "User Logged Out"))

})

const loggedInUserDetail = asyncHandler(async (req, res) => {
    // console.log(req.user,"req.user")

    const loggedInUser = req.user;

    // const loggedInUserFromDB = userModel.findById(req.user?._id);

    // console.log(loggedInUser, "loggedInUser")

    return res.status(200).json(
        new ApiResponse(
            200,
            loggedInUser,
            "User details fetched successfully"
        )
    );

})

export { userRegisteration, userLogin, userLogout, loggedInUserDetail }