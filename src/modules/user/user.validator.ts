import z from "zod";

export const updateProfileSchema = z.object({
    firstName: z.string({ error: "firstName is required" }).trim().min(3, "firstName should have atleast 3 characters").max(30).optional(),
    lastName: z.string({ error: "lastName is required" }).trim().min(3, "lastName should have atleast 3 characters").max(30).optional(),
    phoneNumber: z.string({ error: "Phone number is required" }).regex(/^\d{10}$/, {
        error: "Invalid Phone number"
    }).optional(),
    country: z.enum(["India", "USA", "UK", "Canada", "Australia"], {
        error: "Invalid Country Code"
    }).optional(),
}).refine((data) => Object.keys(data).length > 0, {
    message: "At least one field must be provided",
});

export type TUpdateProfile = z.infer<typeof updateProfileSchema>;
