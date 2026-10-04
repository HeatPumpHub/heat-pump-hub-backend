import { Router } from "express";
import healthRouter from "./health.routes.js";
import itemRouter from "./item.routes.js";

const routes = Router()

routes.use('/health', healthRouter)
routes.use('items', itemRouter)

export default routes
