import { ApiError } from "../../config/apiError"
import { IUserDocument } from "../../models/user.model"
import { createUser, findUserByEmail, findUserById, updateUserById } from "./auth.repository"
import { compareJWTToken, compareRefreshToken, generateAccessToken, generateRefreshToken, ITokenPayload } from "../../utilities/jwtToken"
import { comparePassword, compareRefreshTokenHash, hashPassword, hashRefreshToken } from "../../utilities/passwordDecrypt"
import { TChangePassword, TlogInData, TUser, UserDocument } from "./auth.validator"


export const registerUser = async (userPayload: TUser) => {
    const isUserExist = await findUserByEmail(userPayload.email)

    if (isUserExist) {
        throw new ApiError(401, "User Already Exist")
    }

    const hashedPassword = await hashPassword(userPayload.password);


    return createUser({
        ...userPayload,
        password: hashedPassword,
    })
}

export const loginUser = async (logInPayload: TlogInData) => {
    const userData = await findUserByEmail(logInPayload.email, true);
    if (!userData) throw new ApiError(401, "Invalid email or password");
    const isPasswordMatched = await comparePassword(logInPayload.password, userData.password);
    if (!isPasswordMatched) throw new ApiError(401, "Invalid email or password");
    const user = userData.toJSON()
    const tokenPayload: ITokenPayload = {
        userId: userData._id,
        email: userData.email,
    }

    const userResponse = {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
    };

    const accessToken = generateAccessToken(tokenPayload)
    const refreshToken = generateRefreshToken(tokenPayload)

    const hashedRefreshToken = await hashRefreshToken(refreshToken);
    await updateUserById(user._id.toString(), { refreshToken: hashedRefreshToken })

    return {
        user: userResponse,
        tokens: {
            accessToken,
            refreshToken,
        }
    }
}

export const logoutUser = async (userId: string) => {
    await updateUserById(userId, { $unset: { refreshToken: 1 } })
}

export const getNewTokens = async (refreshToken: string) => {
    let tokenData: ITokenPayload;
    try {
        tokenData = compareRefreshToken(refreshToken) as ITokenPayload;
    } catch (error) {
        throw new ApiError(401, "Invalid or expired refresh token");
    }
    const userData = await findUserById(tokenData.userId, true) as IUserDocument;

    const isTokenActive = await compareRefreshTokenHash(refreshToken, userData.refreshToken || '')
    console.log('isTokenActive>>', isTokenActive)
    if (!isTokenActive) {
        throw new ApiError(404, "Invalid or expired refresh token")
    }
    const tokenPayload: ITokenPayload = {
        userId: userData._id,
        email: userData.email,
    }
    const newAccessToken = generateAccessToken(tokenPayload);
    const newRefreshToken = generateRefreshToken(tokenPayload);
    const hashedToken = await hashRefreshToken(newRefreshToken);
    const data = await updateUserById(
        userData._id.toString(),
        { refreshToken: hashedToken }
    )
    if (data.modifiedCount !== 1) {
        throw new ApiError(401, "Invalid or expired refresh token")
    }
    return {
        accessToken: newAccessToken,
        refreshToken: newRefreshToken
    }
}

export const changeUserPassword = async (userId: string, payload: TChangePassword) => {

    if (payload.oldPassword === payload.newPassword) {
        throw new ApiError(
            400,
            "New password must be different from current password"
        );
    }
    const userData = await findUserById(userId, false, true) as IUserDocument;
    if (!userData) throw new ApiError(400, "User not exist")
    const isOldPasswordVerfied = await comparePassword(payload.oldPassword, userData.password);
    if (!isOldPasswordVerfied) {
        throw new ApiError(401, "Old password is not matching");
    }

    const hashedNewPassword = await hashPassword(payload.newPassword);
    const tokenPayload: ITokenPayload = {
        userId: userData._id,
        email: userData.email,
    }


    const newRefreshToken = generateRefreshToken(tokenPayload);
    const hashedRefreshToken = await hashRefreshToken(newRefreshToken);
    const result = await updateUserById(userId, {
        $set: {
            password: hashedNewPassword,
            refreshToken: hashedRefreshToken
        }
    })

    if (result.modifiedCount !== 1) {
        throw new ApiError(500, "Failed to update password");
    }

    return {
        msg: "Password is updated successfully"
    }
}