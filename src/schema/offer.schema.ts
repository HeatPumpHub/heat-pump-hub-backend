import { OfferStatus } from "@prisma/client";
import z, { iso, number, object, string, uuid } from "zod";

export const offerSnapshotItemSchema = object({
    itemId: uuid({
        message: 'Valid item id is required'
    }),
    name: string({
        message: 'Item name is required'
    }).trim()
    .min(1),
    quantity: number({
        message: 'Quantity is required'
    })
    .int('Quantity must be an integer')
    .positive('Quantity must be positive number'),
    linePrice: number({
        message: 'Line price is required'
    }).nonnegative('Line price can not be negative'),
    discount: number({
        message: 'Item discount is required'
    }).int('Discount must be integer')
    .min(0)
    .max(100)
    .default(0),
    totalPrice: number({
        message: 'Line total price is required'
    }).nonnegative('Line total price can not be negative')
})

export const offerSnapshotSchema = object({
    items: z.array(offerSnapshotItemSchema).min(1, 'At least one item is required in snapshot combination'),
    capturedAt: iso.datetime({
        message: 'Snapshot timestamp is required'
    })
})

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
        offerSnapshot: offerSnapshotSchema,
        basePrice: number({
            message: 'Base price is required'
        }).positive('Base price must be positive number'),
        totalPrice: number({
        message: 'Total price is required'
        }).positive('Total price must be positive number'),
        discount: number({
            message: 'Discount percent is required'
        }).int('Discount must be integer')
        .min(0)
        .max(100)
        .default(0),
        status: z.enum(Object.values(OfferStatus) as [string, ...string[]], {
            message: 'Status is required'
        }).default(OfferStatus.ACTIVE),
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