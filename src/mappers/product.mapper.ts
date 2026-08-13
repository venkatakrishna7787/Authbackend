import { IProductDocument } from "../models/product.model";

export interface IProductResponseDTO {
    id: string;
    name: string;
    price: number;
}
export const mapProductToResponse = (product: IProductDocument): IProductResponseDTO => {

    return {
        id: product.id,
        name: product.name,
        price: product.price
    }

}