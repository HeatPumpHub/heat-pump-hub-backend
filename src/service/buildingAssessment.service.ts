import { Prisma } from "@prisma/client";
import { CreateBuildingAssessmentInput } from "../schema/buildingAssessment.schema.js";
import { prisma } from "../utils/prisma.js";


export async function createBuildingAssessment(input: CreateBuildingAssessmentInput['body']) {
    return prisma.buildingAssessment.create({
        data: input as Prisma.BuildingAssessmentCreateInput
    })
}