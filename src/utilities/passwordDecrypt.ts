
import { createHash } from 'crypto';
import bcrypt from 'bcrypt';

export const hashPassword = async (password: string, saltOrRounds = 10) => {
    return bcrypt.hash(password, saltOrRounds)
}

export const comparePassword = (password: string, hashPassword: string) => {
    return bcrypt.compare(password, hashPassword)
}

const digestToken = (token: string) => {
    return createHash('sha256').update(token).digest('hex')
}

export const hashRefreshToken = (token: string) => {
    return hashPassword(digestToken(token))
}

export const compareRefreshTokenHash = (token: string, hash: string) => {
    return comparePassword(digestToken(token), hash)
}
