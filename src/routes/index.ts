import { Router } from "express";
import healthRouter from "./health.routes.js";
import itemRouter from "./item.routes.js";
import userRouter from "./user.routes.js";

const routes = Router()

routes.use('/health', healthRouter)
routes.use('items', itemRouter)
routes.use('/users', userRouter);

export default routes
