import { ItemCategory } from "@prisma/client";
import { any, boolean, json, nativeEnum, number, object, record, string } from "zod";

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
        category: nativeEnum(ItemCategory, {
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