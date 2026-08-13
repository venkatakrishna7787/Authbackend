import { NextFunction, Request, Response } from "express";
import { createProduct as createProductService } from "./products.service";


export const createProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const response = await createProductService(req.body);
        res.status(response.statusCode).json(response.data)

    } catch (err) {
        next(err);
    }
}