import ProductModel from "../../models/product.model"
import { TProduct } from "./products.validator"


export const createProduct = (productPayload: TProduct) => {
    return ProductModel.create(productPayload)
}