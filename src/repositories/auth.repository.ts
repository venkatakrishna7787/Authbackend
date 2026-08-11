import UserModal from "../model/user.model";
import { TUser } from "../validators/auth.validator";



export function createUser(payload: TUser) {
    return UserModal.create(payload)
}
export function findUserByEmail(email: string, includePassword = false) {
    const query = UserModal.findOne({ email });

    if (includePassword) {
        return query.select("+password")
    }
    return query
}

export function findUserById(id: String, includeRefreshToken = false, includePassword = false) {
    const query = UserModal.findOne({ _id: id });
    if (includeRefreshToken) {
        return query.select("+refreshToken")
    }
    if (includePassword) {
        return query.select("+password")
    }
    return query
}

export function updateUserById(id: String, payload: any) {
    return UserModal.updateOne({ _id: id }, payload);
}