import type { ITokenPayload } from "../utilities/jwtToken";

declare module "express-serve-static-core" {
    interface Request {
        user: ITokenPayload;
    }
}