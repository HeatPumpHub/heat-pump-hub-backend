import { Request, Response, NextFunction, RequestHandler } from "express";

export const asyncHandler = (function: RequestHandler): RequestHandler => {
    return (req: Request, res: Response, next: NextFunction) => {
        Promise.resolve(function(req, res, next)).catch(next)
    }
}