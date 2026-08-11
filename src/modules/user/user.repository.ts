import UserModel from "../../models/user.model";
import { TUpdateProfile } from "./user.validator";

export function findUserById(id: string) {
    return UserModel.findOne({ _id: id });
}

export function updateUserById(id: string, payload: TUpdateProfile) {
    return UserModel.findByIdAndUpdate(id, payload, { returnDocument: "after" });
}
