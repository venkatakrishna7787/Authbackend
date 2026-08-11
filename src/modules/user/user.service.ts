import { ApiError } from "../../config/apiError";
import { mapUserToResponse } from "../../mappers/user.mapper";
import { findUserById, updateUserById } from "./user.repository";
import { TUpdateProfile } from "./user.validator";

export const getProfile = async (userId: string) => {
    const userData = await findUserById(userId);

    if (!userData) {
        throw new ApiError(404, "User is not Exist");
    }

    return {
        user: mapUserToResponse(userData)
    };
};

export const updateProfile = async (userId: string, payload: TUpdateProfile) => {
    const userData = await updateUserById(userId, payload);

    if (!userData) {
        throw new ApiError(404, "User is not Exist");
    }

    return {
        user: mapUserToResponse(userData)
    };
};
