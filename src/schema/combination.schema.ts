import z, { array, boolean, number, object, string, uuid } from "zod";

const combinationItemSchema = object({
    itemId: uuid({
        message: 'Invalid item id format'
    }),
    quantity: number({
        message: 'Quantity is required'
    })
    .int('Quantity must be an integer')
    .positive('Quantity must be positive number')
    .default(1)
})

const payload = {
    body: object({
        name: string({
            message: 'Name is required'
        }),
        isArchived: boolean({
            message: 'Is archived is required'
        }).default(false),
        combinationItems: array(combinationItemSchema).min(1, 'Combination must contain at least one item')
    })
}

const params = {
    params: object({
        id: string({
            message: 'ID is required'
        })
    })
}

export const createCombinationSchema = object({
    ...payload
})

export const updateCombinationSchema = object({
    ...payload,
    ...params
})

export const getCombinationSchema = object({
    ...params
})

export const deleteCombinationSchema = object({
    ...params
})

export type CreateCombinationInput = z.infer<typeof createCombinationSchema>
export type UpdateCombinationInput = z.infer<typeof updateCombinationSchema>
export type GetCombinationInput = z.infer<typeof getCombinationSchema>
export type DeleteCombinationInput = z.infer<typeof deleteCombinationSchema>
