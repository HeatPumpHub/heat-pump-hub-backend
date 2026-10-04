import { Router } from "express";
import validateResource from "../middleware/validateResource.middleware.js";
import { createItemSchema, deleteItemSchema, getItemSchema, updateItemSchema } from "../schema/item.schema.js";
import { createItemHandler, deleteItemHandler, getItemByIdHandler, getItemsHandler, updateItemHandler } from "../controller/item.controller.js";


const itemRouter = Router()

itemRouter.post(
    '/',
    validateResource(createItemSchema),
    createItemHandler
)

itemRouter.get(
    '/',
    getItemsHandler
)

itemRouter.get(
    '/:id',
    validateResource(getItemSchema),
    getItemByIdHandler
)

itemRouter.patch(
    '/:id',
    validateResource(updateItemSchema),
    updateItemHandler
)

itemRouter.delete(
    '/:id',
    validateResource(deleteItemSchema),
    deleteItemHandler
)

export default itemRouter