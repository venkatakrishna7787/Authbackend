
import dotEnv from 'dotenv';
dotEnv.config({
    path: `.env.${process.env.NODE_ENV}`
})

export const env = {
    PORT: process.env.PORT! || 3000,
    DB_URL: process.env.DB_URL!,
    JWT_SECRET: process.env.JWT_SECRET!,
    REFRESH_SECRET: process.env.REFRESH_SECRET!,
    NODE_ENV: process.env.NODE_ENV!
};