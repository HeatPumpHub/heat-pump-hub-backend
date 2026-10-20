import { Request, Response } from "express";
import { asyncHandler } from "../utils/async-handler.js";
import { CreateCombinationInput, DeleteCombinationInput, GetCombinationInput } from "../schema/combination.schema.js";
import { createCombination, deleteCombination, getCombinationByID, getCombinations, updateCombination } from "../service/combination.service.js";
import { UpdateBuildingAssessmentInput } from "../schema/building-assessment.schema.js";


export const createCombinationHandler = asyncHandler(
    async(req: Request<{}, {}, CreateCombinationInput['body']>, res: Response) => {
        const combination = await createCombination(req.body)
        return res.status(201).json(combination)
    }
)

export const getCombinationsHandler = asyncHandler(
    async(req: Request, res: Response) => {
        const combinations = await getCombinations()
        return res.status(200).json(combinations)
    }
)

export const getCombinationByIDHandler = asyncHandler(
    async(req: Request<GetCombinationInput['params']>, res: Response) => {
        const combination = await getCombinationByID({id: req.params.id})

        if(!combination) return res.status(404).json({message: 'Combination not found'})
        
        return res.status(200).json(combination)
    }
)

export const updateCombinationHandler = asyncHandler(
    async(
        req: Request<UpdateBuildingAssessmentInput['params'], {}, UpdateBuildingAssessmentInput['body']>,
        res: Response
    ) => {
        const existingCombination = await getCombinationByID({id: req.params.id})

        if(!existingCombination) return res.status(404).json({message: 'Combination not found'})
        
        const updatedCombination = await updateCombination({id: req.params.id}, req.body)
        return res.status(200).json(updatedCombination)
    }
)

export const deleteCombinationHandler = asyncHandler(
    async(
        req: Request<DeleteCombinationInput['params']>,
        res: Response
    ) => {
        const existingCombination = getCombinationByID({id: req.params.id})

        if(!existingCombination) return res.status(404).json({message: 'Combination not found'})

        await deleteCombination({id: req.params.id})
        return res.status(200).json({message: 'Combination successfully archived'})
    }
)

