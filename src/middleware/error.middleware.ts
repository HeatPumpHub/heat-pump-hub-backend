import { Request, Response, NextFunction } from "express";
import { AppError } from "../errors/app.error.js";

export const errorHandler = (
    err: Error | AppError,
    req: Request,
    res: Response,
    next: NextFunction
): void => {
    const statusCode = err instanceof AppError ? err.statusCode : 500;
    const message = err.message || 'Internal server error'

    res.status(statusCode).json({
        status: statusCode >= 500 ? 'error' : 'fault',
        statusCode,
        message,
        ...(process.env.NODE_ENV === 'development' && { stack: err?.stack })
    });
};