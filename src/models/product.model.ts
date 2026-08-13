import mongoose, { HydratedDocument, InferSchemaType } from "mongoose";

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Product name is required"],
        trim: true,
        minlength: [2, "Product name must be at least 2 characters long"],
        maxlength: [100, "Product name cannot exceed 100 characters"],
    },
    description: {
        type: String,
        required: [true, "Product description is required"],
        trim: true,
        minlength: [10, "Product description must be at least 10 characters long"],
        maxlength: [1000, "Product description cannot exceed 1000 characters"],
    },
    price: {
        type: Number,
        required: [true, "Product price is required"],
        min: [0.01, "Product price must be at least 1"],
    },
    category: {
        type: String,
        required: [true, "Product category is required"],
        trim: true,
        minlength: [2, "Product category must be at least 2 characters long"],
        maxlength: [50, "Product category cannot exceed 50 characters"],
    },
    brand: {
        type: String,
        required: [true, "Product brand is required"],
        trim: true,
        minlength: [2, "Product brand must be at least 2 characters long"],
        maxlength: [50, "Product brand cannot exceed 50 characters"],
    },
    stock: {
        type: Number,
        required: [true, "Product stock is required"],
        min: [0, "Product stock cannot be negative"],
        validate: {
            validator: Number.isInteger,
            message: "Product stock must be a whole number",
        },
    },
    images: {
        type: [String],
        required: [true, "Product images are required"],
        validate: {
            validator: (value: string[]) => value.length >= 1 && value.length <= 10,
            message: "Product images must contain between 1 and 10 items",
        },
    },
    isActive: {
        type: Boolean,
        default: true,
    },
}, {
    timestamps: true,
});

const ProductModel = mongoose.model("Product", productSchema);

export type IProduct = InferSchemaType<typeof productSchema>;
export type IProductDocument = HydratedDocument<InferSchemaType<typeof productSchema>>;

export default ProductModel;