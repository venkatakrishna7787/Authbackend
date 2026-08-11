import { NextFunction, Request, Response } from "express";
import { ApiError } from "../config/apiError";
import mongoose from "mongoose";
import { TokenExpiredError } from "jsonwebtoken";

export function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
    if (err instanceof mongoose.Error) {
        return res.status(500).json({
            ...err
        });
    }
    if (err instanceof ApiError) {
        return res.status(err.statusCode).json({
            message: err.message,
        });
    }
    if (err instanceof TokenExpiredError) {
        return res.status(400).json({
            message: err.message,
        });
    }

    return res.status(500).json({
        message: "Internal Server Error",
    });
}