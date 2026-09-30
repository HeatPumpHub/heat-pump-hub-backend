import { prisma } from '../utils/prisma.js';
import { Prisma } from '@prisma/client';
import { CreateItemInput, UpdateItemInput } from '../schema/item.schema.js';

export async function createItem(input: CreateItemInput['body']) {
    return prisma.item.create({ 
        data: input as Prisma.ItemCreateInput
    })
}