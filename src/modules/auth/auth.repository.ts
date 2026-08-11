import UserModel from "../../models/user.model";
import { TUser } from "./auth.validator";



export function createUser(payload: TUser) {
    return UserModel.create(payload)
}
export function findUserByEmail(email: string, includePassword = false) {
    const query = UserModel.findOne({ email });

    if (includePassword) {
        return query.select("+password")
    }
    return query
}

export function findUserById(id: String, includeRefreshToken = false, includePassword = false) {
    const query = UserModel.findOne({ _id: id });
    if (includeRefreshToken) {
        return query.select("+refreshToken")
    }
    if (includePassword) {
        return query.select("+password")
    }
    return query
}

export function updateUserById(id: String, payload: any) {
    return UserModel.updateOne({ _id: id }, payload);
}