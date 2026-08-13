
import express from 'express'
import authRouter from './modules/auth/auth.routes';
import userRouter from './modules/user/user.routes';
import { errorHandler } from './middlewares/error.middleware';
import productsRouter from './modules/products/products.routes';


const app = express();

app.use(express.json())
app.use("/auth", authRouter);
app.use("/user", userRouter);
app.use("/product", productsRouter);
app.use(errorHandler);
export default app