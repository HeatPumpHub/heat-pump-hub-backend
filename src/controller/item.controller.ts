import { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler.js";
import { createItem, getItems } from "../service/item.service.js";
import { CreateItemInput } from "../schema/item.schema.js";

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