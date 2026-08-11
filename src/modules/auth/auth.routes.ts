import express from 'express'
import { changePassword, logIn, logout, refreshToken, register } from "./auth.controller";
import { changePasswordSchema, logInSchema, refreshTokenSchema, registerSchema } from './auth.validator';
import { reqValidator } from '../../middlewares/reqValidator.middleware';
import { authorization } from '../../middlewares/authorization.middleware';

const authRouter = express.Router()

authRouter.post("/register", reqValidator(registerSchema), register)
authRouter.post("/login", reqValidator(logInSchema), logIn)
authRouter.post("/logout", authorization, logout)
authRouter.post("/refreshToken", reqValidator(refreshTokenSchema), refreshToken)
authRouter.post("/changePassword", authorization, reqValidator(changePasswordSchema), changePassword)

export default authRouter