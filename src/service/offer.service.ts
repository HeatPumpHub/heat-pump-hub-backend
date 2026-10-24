import { OfferStatus, Prisma } from "@prisma/client";
import { CreateOfferInput, GetOfferInput, UpdateOfferInput } from "../schema/offer.schema.js";
import { prisma } from "../utils/prisma.js";



export async function createOffer(input: CreateOfferInput['body']) {
    return prisma.offer.create({
        data: input as Prisma.OfferCreateInput
    })
}

export async function getOffers(where?: Prisma.OfferWhereInput) {
    return prisma.offer.findMany({
        where: {
            ...where,
            status: where?.status ?? OfferStatus.ACTIVE
        }
    })
}

export async function getOfferById(where: Prisma.OfferWhereUniqueInput) {
    return prisma.offer.findUnique({
        where
    })
}

export async function updateOffer(
    where: Prisma.OfferWhereUniqueInput,
    data: UpdateOfferInput['body']
) {
    return prisma.offer.update({
        where,
        data: data as Prisma.OfferUpdateInput
    })
}

export async function deleteOffer(where: Prisma.OfferWhereUniqueInput) {
    return prisma.offer.update({
        where,
        data: {
            status: OfferStatus.ARCHIVED
        }
    })
}