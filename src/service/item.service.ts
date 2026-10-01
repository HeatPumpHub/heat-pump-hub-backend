import { prisma } from '../utils/prisma.js';
import { Prisma } from '@prisma/client';
import { CreateItemInput, UpdateItemInput } from '../schema/item.schema.js';

export async function createItem(input: CreateItemInput['body']) {
    return prisma.item.create({ 
        data: input as Prisma.ItemCreateInput
    })
}

export async function getItems(where?: Prisma.ItemWhereInput) {
    return prisma.item.findMany({
        where: {
            ...where,
            isArchived: where?.isArchived ?? false
        }
    })
}

export async function getItemById(where: Prisma.ItemWhereUniqueInput) {
    return prisma.item.findUnique({
        where,
    })
}

export async function updateItem(where: Prisma.ItemWhereUniqueInput, data: UpdateItemInput['body']) {
    return prisma.item.update({
        where,
        data: data as Prisma.ItemUpdateInput
    })
}

export async function deleteItem(where: Prisma.ItemWhereUniqueInput) {
  return prisma.item.update({
    where,
    data: {
      isArchived: true 
    },
  });
}