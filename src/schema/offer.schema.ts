import { OfferStatus } from "@prisma/client";
import z, { any, date, number, object, record, string } from "zod";


export const payload = {
    body: object({
        offerSnapshot: record(string(), any(), {
            message: 'Offer snapshot is required'
        }),
        price: number({
            message: 'Price is required'
        }).positive('Price must be positive number'),
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