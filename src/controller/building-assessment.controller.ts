import { Request, Response } from "express";
import { asyncHandler } from "../utils/async-handler.js";
import { CreateBuildingAssessmentInput, DeleteBuildingAssessmentInput, GetBuildingAssessmentInput, UpdateBuildingAssessmentInput } from "../schema/building-assessment.schema.js";
import { createBuildingAssessment, deleteBuildingAssessment, getBuildingAssessmentByID, getBuildingAssessments, updateBuildingAssessment } from "../service/building-assessment.service.js";


export const createBuildingAssessmentHandler = asyncHandler(
    async(req: Request<{}, {}, CreateBuildingAssessmentInput['body']>, res: Response) => {
        const buildingAssessment = await createBuildingAssessment(req.body)
        return res.status(201).json(buildingAssessment)
    }
)

export const getBuildingAssessmentsHandler = asyncHandler(
    async (req: Request, res: Response) => {
        const buildingAssessments = getBuildingAssessments()
        return res.status(200).json(buildingAssessments)
    }
)

export const getBuildingAssessmentByIDHandler = asyncHandler(
    async(req: Request<GetBuildingAssessmentInput['params']>, res: Response) => {
        const buildingAssessment = await getBuildingAssessmentByID({id:req.params.id})

        if(!buildingAssessment) return res.status(404).json({message: 'Building assessment not found'})

        return res.status(200).json(buildingAssessment)
    }
)

export const updateBuildingAssessmentHandler = asyncHandler(
    async(
        req: Request<UpdateBuildingAssessmentInput['params'], {}, UpdateBuildingAssessmentInput['body']>,
        res: Response
    ) => {
        const existingBuildingAssessment = await getBuildingAssessmentByID({id: req.params.id})

        if(!existingBuildingAssessment) return res.status(404).json({ message: 'Building assessment not found'})
        
        const updatedBuildingAssessment = await updateBuildingAssessment({id: req.params.id}, req.body)
        return res.status(200).json(updatedBuildingAssessment)
    }
)

export const deleteBuildingAssessmentHandler = asyncHandler(
    async (
        req: Request<DeleteBuildingAssessmentInput['params']>,
        res: Response
    ) => {
        const existingBuildingAssessment = await getBuildingAssessmentByID({id: req.params.id})

        if(!existingBuildingAssessment) return res.status(404).json({message: 'Building assessment not found'})

        await deleteBuildingAssessment({ id: req.params.id})
        return res.status(200).json({ message: 'Building assessment successfully archived'})
    }
)