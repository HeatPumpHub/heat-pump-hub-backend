import { Request, Response, NextFunction } from "express";
import { ZodType, ZodError } from "zod";
import { AppError } from "../errors/app.error.js";

const validateResource = (schema: ZodType<any>) => 
(req: Request, res: Response, next: NextFunction) => {
    try {
        schema.parse({
            body: req.body,
            query: req.query,
            params: req.params
        })
        next()
    } catch (err: any) {
        if(err instanceof ZodError) {
            const formattedMessages = err.issues
            .map((issue) => `${issue.path.join('.')}: ${issue.message}`)
            .join(', ')

            return next(new AppError(`Validation error: ${formattedMessages}`, 400))
        }
        next(err)
    }
}

export default validateResource