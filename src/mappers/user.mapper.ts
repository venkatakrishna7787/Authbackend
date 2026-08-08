import { UserResponseDto } from "../dtos/user.dtos";
import { IModalUser } from "../model/user.model";

export function mapUserToResponse(user: IModalUser): UserResponseDto {
    return {
        id: user._id.toString(),
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phoneNumber: user.phoneNumber,
        country: user.country
    };
}