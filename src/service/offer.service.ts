import { OfferStatus, Prisma } from "@prisma/client";
import { CreateOfferInput, GetOfferInput, UpdateOfferInput } from "../schema/offer.schema.js";
import { prisma } from "../utils/prisma.js";



export async function createOffer(input: CreateOfferInput['body']) {
    const data: Prisma.OfferUncheckedCreateInput = {
    userId: input.userId,
    buildingAssessmentId: input.buildingAssessmentId,
    combinationId: input.combinationId,
    offerSnapshot: input.offerSnapshot,
    basePrice: input.basePrice,
    totalPrice: input.totalPrice,
    discount: input.discount,
    status: (input.status as OfferStatus | undefined) ?? OfferStatus.ACTIVE,
    expirationDate: input.expirationDate,
  };

    return prisma.offer.create({ data })
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
    const updateData: Prisma.OfferUncheckedUpdateInput = {
        userId: data.userId,
        buildingAssessmentId: data.buildingAssessmentId,
        combinationId: data.combinationId,
        offerSnapshot: data.offerSnapshot,
        basePrice: data.basePrice,
        totalPrice: data.totalPrice,
        discount: data.discount,
        status: data.status as OfferStatus | undefined,
        expirationDate: data.expirationDate,
    };

    return prisma.offer.update({
        where,
        data: updateData
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