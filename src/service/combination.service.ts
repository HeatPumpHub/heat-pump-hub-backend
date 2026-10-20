import { Prisma } from "@prisma/client";
import { CreateCombinationInput, UpdateCombinationInput } from "../schema/combination.schema.js";
import { prisma } from "../utils/prisma.js";


export async function createCombination(input: CreateCombinationInput['body']) {
    return prisma.combination.create({
        data: input as Prisma.CombinationCreateInput
    })
}

export async function getCombinations(where?: Prisma.CombinationWhereInput) {
    return prisma.combination.findMany({
        where: {
            ...where,
            isArchived: false
        }
    })
}

export async function getCombinationByID(where: Prisma.CombinationWhereUniqueInput) {
    return prisma.combination.findUnique({
        where
    })
}

export async function updateCombination(
    where: Prisma.CombinationWhereUniqueInput,
    data: UpdateCombinationInput['body']
) {
    return prisma.combination.update({
        where,
        data: data as Prisma.CombinationUpdateInput
    })
}

export async function deleteCombination(where: Prisma.CombinationWhereUniqueInput) {
    return prisma.combination.update({
        where,
        data: {
            isArchived: true
        }
    })
}