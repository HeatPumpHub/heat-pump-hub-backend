import { Prisma } from "@prisma/client";
import { CreateBuildingAssessmentInput, UpdateBuildingAssessmentInput } from "../schema/buildingAssessment.schema.js";
import { prisma } from "../utils/prisma.js";


export async function createBuildingAssessment(input: CreateBuildingAssessmentInput['body']) {
    return prisma.buildingAssessment.create({
        data: input as Prisma.BuildingAssessmentCreateInput
    })
}

export async function getBuildingAssessments(where?: Prisma.BuildingAssessmentWhereInput) {
    return prisma.buildingAssessment.findMany({
        where: {
            ...where,
            isArchived: false
        }
    })
}

export async function getBuildingAssessmentByID(where: Prisma.BuildingAssessmentWhereUniqueInput) {
    return prisma.buildingAssessment.findUnique({
        where
    })
}

export async function updateBuildingAssessment(
    where: Prisma.BuildingAssessmentWhereUniqueInput,
    data: UpdateBuildingAssessmentInput['body']
) {
    return prisma.buildingAssessment.update({
        where,
        data: data as Prisma.BuildingAssessmentUpdateInput
    })
}

export async function deleteBuildingAssessment(where: Prisma.BuildingAssessmentWhereUniqueInput) {
    return prisma.buildingAssessment.update({
        where,
        data: {
            isArchived: true
        }
    })
}