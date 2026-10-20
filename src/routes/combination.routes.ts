import { Router } from "express";
import validateResource from "../middleware/validate-resource.middleware.js";
import { createCombinationSchema, deleteCombinationSchema, getCombinationSchema, updateCombinationSchema } from "../schema/combination.schema.js";
import { createCombinationHandler, deleteCombinationHandler, getCombinationByIDHandler, getCombinationsHandler, updateCombinationHandler } from "../controller/combination.controller.js";


const combinationRouter = Router()

combinationRouter.post(
    '/',
    validateResource(createCombinationSchema),
    createCombinationHandler
)

combinationRouter.get(
    '/',
    getCombinationsHandler
)

combinationRouter.get(
    '/:id',
    validateResource(getCombinationSchema),
    getCombinationByIDHandler
)

combinationRouter.patch(
    '/:id',
    validateResource(updateCombinationSchema),
    updateCombinationHandler
)

combinationRouter.delete(
    '/:id',
    validateResource(deleteCombinationSchema),
    deleteCombinationHandler
)

export default combinationRouter