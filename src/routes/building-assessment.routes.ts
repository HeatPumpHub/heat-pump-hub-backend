import { Router } from "express";
import validateResource from "../middleware/validate-resource.middleware.js";
import { createBuildingAssessmentSchema, deleteBuildingAssessmentSchema, getBuildingAssessmentSchema, updateBuildingAssessmentSchema } from "../schema/building-assessment.schema.js";
import { createBuildingAssessmentHandler, deleteBuildingAssessmentHandler, getBuildingAssessmentByIDHandler, getBuildingAssessmentsHandler, updateBuildingAssessmentHandler } from "../controller/building-assessment.controller.js";


const buildingAssessmentRouter = Router()

buildingAssessmentRouter.post(
    '/',
    validateResource(createBuildingAssessmentSchema),
    createBuildingAssessmentHandler
)

buildingAssessmentRouter.get(
    '/',
    getBuildingAssessmentsHandler
)

buildingAssessmentRouter.get(
    '/:id',
    validateResource(getBuildingAssessmentSchema),
    getBuildingAssessmentByIDHandler
)

buildingAssessmentRouter.patch(
    '/id',
    validateResource(updateBuildingAssessmentSchema),
    updateBuildingAssessmentHandler
)

buildingAssessmentRouter.delete(
    '/id',
    validateResource(deleteBuildingAssessmentSchema),
    deleteBuildingAssessmentHandler
)

export default buildingAssessmentRouter