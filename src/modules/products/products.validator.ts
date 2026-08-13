import z from "zod";


export const productSchema = z.object({
    name: z.string({ error: "Product name is required" })
        .trim()
        .min(2, { error: "Product name must be at least 2 characters" })
        .max(100, { error: "Product name must not exceed 100 characters" }),
    description: z.string({ error: "Product description is required" })
        .trim()
        .min(10, { error: "Product description must be at least 10 characters" })
        .max(1000, { error: "Product description must not exceed 1000 characters" }),
    price: z.number("Product price is required").gt(0, {
        error: "Product price must be greater than 0"
    }),
    category: z.string({ error: "Product category is required" })
        .trim()
        .min(2, { error: "Product category must be at least 2 characters" })
        .max(50, { error: "Product category must not exceed 50 characters" }),
    brand: z.string({ error: "Product brand is required" })
        .trim()
        .min(2, { error: "Product brand must be at least 2 characters" })
        .max(50, { error: "Product brand must not exceed 50 characters" }),
    stock: z.number({ error: "Stock is required and must be a number" })
        .int({ error: "Stock must be a whole number" })
        .min(0, { error: "Stock cannot be negative" }),
    images: z.array(
        z.url({
            error: "Invalid image URL"
        })
    )

        .min(1, { error: "At least one product image is required" })
        .max(10, { error: "A maximum of 10 product images is allowed" }),
    isActive: z.boolean().default(true)
}).strict()

export type TProduct = z.infer<typeof productSchema>