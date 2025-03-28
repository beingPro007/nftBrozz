import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/AsyncHandler.js";

const generateAccessAndRefreshTokens = async (userId) => {
    try {
        
        const user = await User.findById(userId);
        if(!user){
            throw new ApiError("User not found via id", 400)
        }        

        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();

        user.refreshToken = refreshToken;
        await user.save({ validateBeforeSave: false });
        return { accessToken, refreshToken };
    } catch (error) {
        throw new ApiError(`Error in generating refresh and access token ${error.message}`, 400);
    }
}

const registerUser = asyncHandler(async (req, res, _) => {

    if (!req.body) {
        throw new ApiError("Invalid request: No request body found", 400);
    }

    const { email, username, fullName, password } = req.body;

    if ([username, email, fullName, password].some((fields) => fields.trim === "")) {
        throw new ApiError("Username or emails are not found", 400);
    }

    const existedUser = await User.findOne({
        $or: [{ username }, { email }]
    });

    if (existedUser) {
        throw new ApiError("User Already exits.. Try Logging in!");
    }

    const user = await User.create({
        username: username.toLowerCase(),
        email,
        fullName,
        password
    })

    if (!user) {
        throw new ApiError("User creation failed!!!", 400)
    }

    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    );

    if (!createdUser) {
        throw new ApiError("Error in removing the password from the user!!!", 400)
    }

    console.log(`User is: ${user}`);

    return res.
        status(200).
        json(new ApiResponse(200, "User Created successfully!!", user));

});

const loginUser = asyncHandler(async (req, res, _) => {
    const { email, username, password } = req.body;

    if ([email, username, password].some((field) => !field || field.trim === "")) {
        throw new ApiError("All fields are required!!", 400);
    }

    const user = await User.findOne({
        $or: [{ username }, { email }]
    });

    if (!user) {
        throw new ApiError("User not found, register first", 400);
    }

    const validPass = await user.passwordCheck(password);
    if (!validPass) {
        throw new ApiError("Password is incorrect", 400);
    }

    const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(user._id);

    const loggedInUser = await User.findById(user._id).select('-password -refreshToken');

    const options = {
        httpOnly: true,
        secure: true,
    };

    return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(
            new ApiResponse(200, "User logged in successfully!!", {
                user: loggedInUser,
                accessToken,
                refreshToken,
            })
        );
});


export { registerUser, loginUser };