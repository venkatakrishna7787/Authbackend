
import express from 'express'
import authRouter from './routes/auth.routes';
import { errorHandler } from './middlewares/error.middleware';


const app = express();

app.use(express.json())
app.use("/user", authRouter);
app.use(errorHandler);
export default app