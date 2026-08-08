import { NextFunction, Request, Response } from "express";
import { compareJWTToken, ITokenPayload } from "../utilities/jwtToken";
import { ApiError } from "../config/apiError";


export function authorization(req: Request, res: Response, next: NextFunction) {
    try {
        const accessToken = req.headers.authorization || '';

        if (!accessToken.toString().startsWith("Bearer ")) {
            throw new ApiError(401, "Invalid authorization format");
        }
        const authorizationToken = accessToken?.split(" ")[1]

        if (!authorizationToken) {
            throw new ApiError(401, "Authorization header is required");
        }

        const tokenData = compareJWTToken(authorizationToken || '')
        req.user = tokenData as ITokenPayload;

        console.log(req.user)
        next()
        return

    } catch (err) {
        next(err)
    }
}