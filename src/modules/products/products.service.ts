import { IProductResponseDTO, mapProductToResponse } from "../../mappers/product.mapper"
import { IApiSuccess } from "../../types/apiSuccess"
import { createProduct as createProductInDb } from "./products.repository"
import { TProduct } from "./products.validator"


export const createProduct = async (payload: TProduct): Promise<IApiSuccess<IProductResponseDTO>> => {
    const response = await createProductInDb(payload)

    return {
        statusCode: 201,
        data: {
            success: true,
            message: 'product created',
            data: mapProductToResponse(response)
        }
    }
}