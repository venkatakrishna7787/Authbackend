import { UserResponseDto } from "../dtos/user.dtos";
import { IUserDocument } from "../models/user.model";

export function mapUserToResponse(user: IUserDocument): UserResponseDto {
    return {
        id: user._id.toString(),
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phoneNumber: user.phoneNumber,
        country: user.country
    };
}


