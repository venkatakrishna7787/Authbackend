import { HydratedDocument } from "mongoose"
import z from "zod"


export const registerSchema = z.object({
    firstName: z.string({ error: "firstName is required" }).trim().min(3, "firstName should have atleast 3 characters").max(30),
    lastName: z.string({ error: "lastName is required" }).trim().min(3, "lastName should have atleast 3 characters").max(30),
    email: z.string({ error: "Email is required" }).email({ pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, message: 'Invalid Email Id' }),
    phoneNumber: z.string("Phone number is required").regex(/^\d{10}$/, {
        error: "Invalid Phone number"
    }),
    password: z.string("password is required").min(8, 'Password should be min 8 charcters').regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, {
        error: "password should contain atleast 1 Uppercase 1 Lowercase 1 Number 1 Special Character"
    }),
    country: z.enum(["India", "USA", "UK", "Canada", "Australia"], {
        error: (issues) => {
            if (!issues.input) {
                return "Country is required"
            }
            return "Invalid Country Code"
        }
    })
}).strict()


export const logInSchema = z.object({
    email: z.string({ error: "Email is required" }).email({ pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, message: 'Invalid Email Id' }),
    password: z.string("password is required").min(8, 'Password should be min 8 charcters')
}).strict()

export const refreshTokenSchema = z.object({
    refreshToken: z.string({ error: "RefreshToken is required" }),
}).strict()

export const changePasswordSchema = z.object({
    oldPassword: z.string({ error: "oldPassword is required" }).min(8, "Password should be minimum 8 characters"),
    newPassword: z.string({ error: "newPassword is required" }).min(8, "Password should be minimum 8 characters").regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, {
        error: "password should contain atleast 1 Uppercase 1 Lowercase 1 Number 1 Special Character"
    }),
});
export type TUser = z.infer<typeof registerSchema>
export type TlogInData = z.infer<typeof logInSchema>
export type TRefreshToken = z.infer<typeof refreshTokenSchema>
export type TChangePassword = z.infer<typeof changePasswordSchema>

export type UserDocument = HydratedDocument<TUser>;