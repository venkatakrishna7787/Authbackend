import express from "express";
import { authorization } from "../../middlewares/authorization.middleware";
import { profile, updateProfile } from "./user.controller";
import { updateProfileSchema } from "./user.validator";
import { reqValidator } from "../../middlewares/reqValidator.middleware";

const userRouter = express.Router();

userRouter.get("/profile", authorization, profile);
userRouter.patch("/profile", authorization, reqValidator(updateProfileSchema), updateProfile);

export default userRouter;
