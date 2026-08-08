import { NextFunction, Request, Response } from "express"
import { ZodError, ZodTypeAny } from "zod"

export function reqValidator(Schema: ZodTypeAny) {
    return (req: Request, res: Response, next: NextFunction) => {
        try {
            Schema.parse(req.body)
            next()
        } catch (err) {
            if (err instanceof ZodError) {
                return res.status(400).json({
                    success: false,
                    errors: err.issues.map((issue) => ({
                        code: issue.code,
                        message: issue.message,
                        path: issue.path,
                        keys: "keys" in issue ? issue.keys : undefined
                    }))
                })
            }

            return res.status(400).json({
                success: false,
                message: "Validation failed"
            })
        }
    }
}