import { Router } from "express";
import healthRouter from "./health.routes.js";
import itemRouter from "./item.routes.js";
import userRouter from "./user.routes.js";
import buildingAssessmentRouter from "./building-assessment.routes.js";
import combinationRouter from "./combination.routes.js";

const routes = Router()

routes.use('/health', healthRouter)
routes.use('/items', itemRouter)
routes.use('/users', userRouter);
routes.use('/building-assessments', buildingAssessmentRouter)
routes.use('/combination', combinationRouter)

export default routes
