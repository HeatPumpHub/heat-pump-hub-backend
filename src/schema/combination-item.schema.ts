import z, { int, number, object, string } from "zod";


const payload = {
    body: object({
        quantity: number({
            message: 'Quantity is required'
        })
        .int('Quantity must be an integer')
        .positive('Quantity must be positive number')
        .default(1)
    })
}

const params = {
    params: object({
        id: string({
            message: 'ID is required'
        })
    })
}

export const createCombinationItemSchema = object({
    ...payload
})

export const getCombinationItemSchema = object({
    ...params
})

export const updateCombinationItemSchema = object({
    ...params,
    ...payload
})

export const deleteCombinationSchema = object({
    ...params
})

export type CreateCombinationItemInput = z.infer<typeof createCombinationItemSchema>
export type GetCombinationItemInput = z.infer<typeof getCombinationItemSchema>
export type UpdateCombinationItemInput = z.infer<typeof updateCombinationItemSchema>
export type DeleteCombinationItemInput = z.infer<typeof deleteCombinationSchema>