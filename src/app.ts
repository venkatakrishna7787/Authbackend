
import express from 'express'
import authRouter from './modules/auth/auth.routes';
import userRouter from './modules/user/user.routes';
import { errorHandler } from './middlewares/error.middleware';


const app = express();

app.use(express.json())
app.use("/auth", authRouter);
app.use("/user", userRouter);
app.use(errorHandler);
export default app