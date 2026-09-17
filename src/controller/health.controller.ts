import { Request, Response, NextFunction } from "express"

export const getHealthStatus = async(
    req: Request,
    res:Response,
    next: NextFunction
): Promise<void> => {
    try {
        res.status(200).json({
            status: 'success',
            message: 'HeatPumpHub is operational',
            environment: process.env.NODE_ENV,
            timestamp: new Date().toISOString(),

        })
    } catch (err) {
        next(err)
    }
}
