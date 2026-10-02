import { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler.js";
import { createItem, getItemById, getItems } from "../service/item.service.js";
import { CreateItemInput, GetItemInput } from "../schema/item.schema.js";

export const createItemHandler = asyncHandler(
    async (req: Request<{}, {}, CreateItemInput['body']>, res: Response) => {
        const item = await createItem(req.body)
        return res.status(201).json(item)
    }
)

export const getItemsHandler = asyncHandler(
    async (req: Request, res: Response) => {
        const item = await getItems()
        return res.status(200).json(item)
    }
)

export const getItemByIdHandler = asyncHandler(
    async (req: Request<GetItemInput['params']>, res: Response) => {
        const item = await getItemById({ id: req.params.id })

        if(!item || item.isArchived) {
            return res.status(404).json({message: 'Item not found'})
        }

        return res.status(200).json(item)
    }
)