import { Prisma } from "@prisma/client";
import { prisma } from "../utils/prisma.js";
import { CreateCombinationItemInput, UpdateCombinationItemInput } from "../schema/combination-item.schema.js";


export async function createCombinationItem(input: CreateCombinationItemInput['body']) {
    return prisma.combinationItem.create({
        data: input as Prisma.CombinationItemCreateInput
    })
}

export async function getCombinationItems(where?: Prisma.CombinationItemWhereInput) {
    return prisma.combinationItem.findMany({
        where: {
            ...where
        }
    })
}

export async function getCombinationItemByID(where: Prisma.CombinationItemWhereUniqueInput) {
    return prisma.combinationItem.findUnique({
        where
    })
}

export async function updateCombinationItem(
    where: Prisma.CombinationItemWhereUniqueInput,
    data: UpdateCombinationItemInput['body']
) {
    return prisma.combinationItem.update({
        where,
        data: data as Prisma.CombinationItemUpdateInput
    })
}