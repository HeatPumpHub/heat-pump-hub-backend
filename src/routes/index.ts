import { Router } from "express";
import healthRouter from "./health.routes.js";

const routes = Router()

routes.use('/health', healthRouter)

export default routes
