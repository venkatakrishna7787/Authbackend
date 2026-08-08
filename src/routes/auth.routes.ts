import express from 'express'
import { logIn, profile, refreshToken, register } from "../controllers/auth.controller";
import { logInSchema, refreshTokenSchema, registerSchema } from '../validators/auth.validator';
import { reqValidator } from '../middlewares/reqValidator.middleware';
import { authorization } from '../middlewares/authorization.middleware';

const authRouter = express.Router()

authRouter.post("/register", reqValidator(registerSchema), register)
authRouter.post("/login", reqValidator(logInSchema), logIn)
authRouter.get("/profile", authorization, profile)
authRouter.post("/refreshToken", reqValidator(refreshTokenSchema), refreshToken)

export default authRouter