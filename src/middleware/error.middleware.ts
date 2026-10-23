import { Request, Response, NextFunction } from "express";
import { AppError } from "../errors/app.error.js";
import { ZodError } from "zod";

export const errorHandler = (
    err: any,
    req: Request,
    res: Response,
    next: NextFunction
): void => {
    let statusCode = err instanceof AppError ? err.statusCode : 500;
    let message = err.message || 'Internal server error'
    let errors: Record<string, string[]> | undefined = undefined

    if (err instanceof ZodError) {
        statusCode = 400
        message = 'Validation required'

        errors = err.issues.reduce((acc: Record<string, string[]>, issue) => {
            const fieldName = issue.path.join('.') || 'general';
            if (!acc[fieldName]) {
                acc[fieldName] = [];
            }
            acc[fieldName].push(issue.message);
            return acc;
        }, {});
    }
    res.status(statusCode).json({
        status: statusCode >= 500 ? 'error' : 'fault',
        statusCode,
        message,
        ...(errors && { errors }),
        ...(process.env.NODE_ENV === 'development' && { stack: err?.stack })
    });
};