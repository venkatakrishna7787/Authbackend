import { changeUserPassword, getNewTokens, getProfile, loginUser, logoutUser, registerUser } from "../services/auth.services";
import { NextFunction, Request, Response } from "express";
import { TlogInData } from "../validators/auth.validator";

export async function register(req: Request, res: Response, next: NextFunction) {
    try {
        await registerUser(req.body);
        res.status(201).json({
            msg: 'User successfully created'
        })
    } catch (error) {
        next(error)
    }
}
export async function logIn(req: Request, res: Response, next: NextFunction) {
    try {
        const response = await loginUser(req.body as TlogInData)
        res.status(200).json(response)
    } catch (err) {
        next(err)
    }
}
export async function profile(req: Request, res: Response, next: NextFunction) {
    try {
        const response = await getProfile(req.user.userId)
        res.status(200).json(response)
    } catch (err) {
        next(err)
    }
}

export async function logout(req: Request, res: Response, next: NextFunction) {
    try {
        await logoutUser(req.user.userId)
        res.status(200).json({
            message: "Logged out successfully"
        })
    } catch (err) {
        console.log(err)
        next(err)
    }
}

export async function refreshToken(req: Request, res: Response, next: NextFunction) {
    try {
        const response = await getNewTokens(req.body.refreshToken)
        res.status(200).json(response)
    } catch (err) {
        console.log("errr", err)
        next(err)
    }
}

export async function changePassword(req: Request, res: Response, next: NextFunction) {
    try {
        const response = await changeUserPassword(req.user.userId, req.body)
        res.status(200).json(response)
    } catch (err) {
        console.log("errr", err)
        next(err)
    }
}

