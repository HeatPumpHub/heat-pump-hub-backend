import { Prisma } from "@prisma/client";
import { CreateBuildingAssessmentInput, UpdateBuildingAssessmentInput } from "../schema/building-assessment.schema.js";
import { prisma } from "../utils/prisma.js";
import { calculateDHWVolume, calculateRequiredPower } from "../engines/math.engine.js";


export async function createBuildingAssessment(input: CreateBuildingAssessmentInput['body'], userId: string) {

    const manualCalculatedPower = calculateRequiredPower(input.manualInputData)
    const calculatedDHWVolume = calculateDHWVolume(input.manualInputData)

    return prisma.buildingAssessment.create({
        data: {
            ...input,
            manualCalculatedPower,
            manualCalculatedDHWVolume: calculatedDHWVolume,
            user: {
                connect: { id: userId }
            }
        }
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