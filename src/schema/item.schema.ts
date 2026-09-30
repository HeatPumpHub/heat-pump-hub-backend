import { ItemCategory } from "@prisma/client";
import { any, boolean, z, number, object, record, string } from "zod";

const payload = {
    body: object({
        name: string({
            message: 'Name is required'
        }),
        brand: string({
            message: 'Brand is required'
        }),
        price: number({
            message: 'Price is required'
        }).positive('Price must be positive number'),
        image: string({
            message: 'Image is required'
        }),
        description: string({
            message: 'Description is required'
        }),        
        warranty: number({
            message: 'Warranty duration is required',
            })
            .int('Warranty must be an integer')
            .positive('Warranty duration must be positive number'),
        manufacturerNumber: string({
            message: 'Manufacturer number is required'
        }),
        category: z.enum(Object.values(ItemCategory) as [string, ...string[]], {
            message: 'Category is required',
            }),
        categorySpecificCharacteristics: record(string(), any(), {
            message: 'Category specific characteristics are required',
            }),
        isArchived: boolean({
            message: 'Is archived value is required'
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

export const createItemSchema = object({
    ...payload
})

export const updateItemSchema = object({
    ...payload,
    ...params
})

export const getItemSchema = object({
    ...params
})

export const deleteItemSchema = object({
    ...params
})

export type CreateItemInput = z.infer<typeof createItemSchema>
export type UpdateItemInput = z.infer<typeof updateItemSchema>
export type GetItemInput = z.infer<typeof getItemSchema>
export type DeleteItemInput = z.infer<typeof deleteItemSchema>