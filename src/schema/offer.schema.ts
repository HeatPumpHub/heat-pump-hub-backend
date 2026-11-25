import { OfferStatus } from "@prisma/client";
import z, { any, number, object, record, string, uuid } from "zod";


export const payload = {
    body: object({
        userId: uuid({
            message: 'Valid user id is required'
        }),
        buildingAssessmentId: uuid({
            message: 'Valid building assessment id is required'
        }),
        combinationId: uuid({
            message: 'Valid combination id is required'
        }),
        offerSnapshot: record(string(), any(), {
            message: 'Offer snapshot is required'
        }),
        basePrice: number({
            message: 'Base price is required'
        }).positive('Base price must be positive number'),
        totalPrice: number({
        message: 'Total price is required'
        }).positive('Total price must be positive number'),
        discount: number({
            message: 'Discount percent is required'
        }).int('Discount must be integer')
        .nonnegative('Discount must be positive number or zero')
        .optional(),
        status: z.enum(Object.values(OfferStatus) as [string, ...string[]], {
            message: 'Status is required'
        }).default(OfferStatus.ACTIVE)
        .optional(),
        expirationDate: z.coerce.date({
            message: 'Expiration date is required'
        })
    })
}

const params = {
    params: object({
        id: string({
            message: 'ID is required'
        })
    })
}

export const createOfferSchema = object({
    ...payload
})

export const getOfferSchema = object({
    ...params
})

export const updateOfferSchema = object({
    ...params,
    ...payload
})

export const deleteOfferSchema = object({
    ...params
})

export type CreateOfferInput = z.infer<typeof createOfferSchema>
export type GetOfferInput = z.infer<typeof getOfferSchema>
export type UpdateOfferInput = z.infer<typeof updateOfferSchema>
export type DeleteOfferInput = z.infer<typeof deleteOfferSchema>