import { Request, Response } from "express"
import { asyncHandler } from "../utils/async-handler.js"
import { CreateCombinationItemInput, GetCombinationItemInput, UpdateCombinationItemInput } from "../schema/combination-item.schema.js"
import { createCombinationItem, getCombinationItemByID, getCombinationItems, updateCombinationItem } from "../service/combination-item.service.js"


export const createCombinationItemHandler = asyncHandler(
    async(req: Request<{}, {}, CreateCombinationItemInput['body']>, res: Response) => {
        const combinationItem = await createCombinationItem(req.body)
        return res.status(201).json(combinationItem)
    }
)

export const getCombinationItemsHandler = asyncHandler(
    async(req: Request, res: Response) => {
        const combinationItems = await getCombinationItems()
        return res.status(200).json(combinationItems)
    }
)

export const getCombinationItemByIDHandler = asyncHandler(
    async(req: Request<GetCombinationItemInput['params']>, res: Response) => {
        const combinationItem = await getCombinationItemByID({id: req.params.id})

        if(!combinationItem) return res.status(404).json({message: 'Combination item not found'})
        
        return res.status(200).json(combinationItem)
    }
)

export const updateCombinationItemHandler = asyncHandler(
    async(req: Request<UpdateCombinationItemInput['params'], {}, UpdateCombinationItemInput['body']>, res: Response) => {
        const existingCombinationItem = await getCombinationItemByID({id: req.params.id})

        if(!existingCombinationItem) return res.status(404).json({message: 'Combination item not found'})

        const updatedCombinationItem = await updateCombinationItem({id: req.params.id }, req.body)
        return res.status(200).json(updatedCombinationItem)
    }
)