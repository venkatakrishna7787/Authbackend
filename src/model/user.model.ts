import mongoose, { HydratedDocument, InferSchemaType } from "mongoose";

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true,
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        lowercase: true,
        trim: true,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    phoneNumber: {
        type: String,
        trim: true,
        unique: true,
        required: true
    },
    country: {
        type: String,
        trim: true,
        required: true,
        enum: [
            "India",
            "USA",
            "UK",
            "Canada",
            "Australia"
        ]
    },
    refreshToken: {
        type: String,
        required: false,
        select: false
    }
}, {
    timestamps: true
})

const UserModal = mongoose.model("user", userSchema);


export type IModalUser = HydratedDocument<InferSchemaType<typeof userSchema>>
export default UserModal