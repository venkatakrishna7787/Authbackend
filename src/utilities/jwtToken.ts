import { randomUUID } from 'crypto'
import jwt from 'jsonwebtoken'
import { env } from '../config/env'

export interface ITokenPayload {
    userId: any;
    email: string;
}


const generateAccessToken = (data: ITokenPayload) => {
    return jwt.sign(data, env.JWT_SECRET, {
        expiresIn: '1d'
    })
}

const generateRefreshToken = (data: ITokenPayload) => {
    return jwt.sign({ ...data, jti: randomUUID() }, env.REFRESH_SECRET, {
        expiresIn: '7d'
    })
}

const compareJWTToken = (token: string) => {
    return jwt.verify(token, env.JWT_SECRET)
}
const compareRefreshToken = (token: string) => {
    return jwt.verify(token, env.REFRESH_SECRET)
}

export {
    generateAccessToken,
    generateRefreshToken,
    compareJWTToken,
    compareRefreshToken
}