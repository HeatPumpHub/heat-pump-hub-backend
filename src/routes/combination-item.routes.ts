import { Router } from "express";
import validateResource from "../middleware/validate-resource.middleware.js";
import { createCombinationItemSchema, getCombinationItemSchema, updateCombinationItemSchema } from "../schema/combination-item.schema.js";
import { createCombinationItemHandler, getCombinationItemByIDHandler, getCombinationItemsHandler, updateCombinationItemHandler } from "../controller/combination-item.controller.js";


const combinationItemRouter = Router()

combinationItemRouter.post(
    '/',
    validateResource(createCombinationItemSchema),
    createCombinationItemHandler
)

combinationItemRouter.get(
    '/',
    getCombinationItemsHandler
)

combinationItemRouter.get(
    '/:id',
    validateResource(getCombinationItemSchema),
    getCombinationItemByIDHandler
)

combinationItemRouter.patch(
    '/:id',
    validateResource(updateCombinationItemSchema),
    updateCombinationItemHandler
)

export default combinationItemRouter