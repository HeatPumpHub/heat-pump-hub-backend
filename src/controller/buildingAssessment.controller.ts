import { Request, Response } from 'express';
import { asyncHandler } from '../utils/asyncHandler.js';
import {
    createBuildingAssessment,
    deleteBuildingAssessment,
    getBuildingAssessmentById,
    getBuildingAssessments,
    updateBuildingAssessment,
} from '../service/building-assessment.service.js';
import {
    CreateBuildingAssessmentInput,
    DeleteBuildingAssessmentInput,
    GetBuildingAssessmentInput,
    UpdateBuildingAssessmentInput,
} from '../schema/building-assessment.schema.js';

export const createBuildingAssessmentHandler = asyncHandler(
    async (req: Request<{}, {}, CreateBuildingAssessmentInput['body']>, res: Response) => {
        // userId се взима сигурно от автентикационния мидълуер на сървъра
        const userId = (req as any).user?.id;

        if (!userId) {
            return res.status(401).json({ message: 'Unauthorized: User not authenticated' });
        }

        const assessment = await createBuildingAssessment(req.body, userId);
        return res.status(201).json(assessment);
    }
);

export const getBuildingAssessmentsHandler = asyncHandler(
    async (_req: Request, res: Response) => {
        const assessments = await getBuildingAssessments();
        return res.status(200).json(assessments);
    }
);

export const getBuildingAssessmentByIdHandler = asyncHandler(
    async (req: Request<GetBuildingAssessmentInput['params']>, res: Response) => {
        const assessment = await getBuildingAssessmentById({ id: req.params.id });

        if (!assessment || assessment.isArchived) {
            return res.status(404).json({ message: 'Building assessment not found' });
        }

        return res.status(200).json(assessment);
    }
);

export const updateBuildingAssessmentHandler = asyncHandler(
    async (
        req: Request<UpdateBuildingAssessmentInput['params'], {}, UpdateBuildingAssessmentInput['body']>,
        res: Response
    ) => {
        const currentAssessment = await getBuildingAssessmentById({ id: req.params.id });

        if (!currentAssessment || currentAssessment.isArchived) {
            return res.status(404).json({ message: 'Building assessment not found' });
        }

        const updatedAssessment = await updateBuildingAssessment(
            { id: req.params.id },
            req.body
        );
        return res.status(200).json(updatedAssessment);
    }
);

export const deleteBuildingAssessmentHandler = asyncHandler(
    async (req: Request<DeleteBuildingAssessmentInput['params']>, res: Response) => {
        const currentAssessment = await getBuildingAssessmentById({ id: req.params.id });

        if (!currentAssessment || currentAssessment.isArchived) {
            return res.status(404).json({ message: 'Building assessment not found' });
        }

        const archivedAssessment = await deleteBuildingAssessment({ id: req.params.id });
        return res.status(200).json({
            message: 'Building assessment archived successfully',
            assessment: archivedAssessment,
        });
    }
);