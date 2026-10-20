import z, { boolean, object, string } from "zod";


const payload = {
    body: object({
        name: string({
            message: 'Name is required'
        }),
        isArchived: boolean({
            message: 'Is archived is required'
        }).default(false)
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
