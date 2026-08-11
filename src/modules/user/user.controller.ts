import { NextFunction, Request, Response } from "express";
import { getProfile, updateProfile as updateUserProfile } from "./user.service";

export async function profile(req: Request, res: Response, next: NextFunction) {
    try {
        const response = await getProfile(req.user.userId);
        res.status(200).json(response);
    } catch (error) {
        next(error);
    }
}

export async function updateProfile(req: Request, res: Response, next: NextFunction) {
    try {
        const response = await updateUserProfile(req.user.userId, req.body);
        res.status(200).json(response);
    } catch (error) {
        next(error);
    }
}
