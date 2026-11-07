import { ItemCategory } from "@prisma/client";
import { boolean, z, number, object, record, string } from "zod";

export const outdoorUnitSchema = object({
    nominalPower: number({
        message: 'Nominal power is required'
    }).positive('Nominal power must be positive'),
    refrigerantType: string({
        message: 'Refrigerant type is required'
    }),
    electricalConnection: string({
        message: 'Electrical connection is required'
    })
})

export const indoorUnitSchema = object({
    refrigerantType: string({
        message: 'Refrigerant type is required'
    }),
    electricalConnection: string({
        message: 'Electrical connection is required'
    }),
    hotWaterCylinderVolume: number().int().positive().optional(),
    hotWaterCylinderMaterial: string({
        message: 'Material is required'
    })
})

export const hydroboxSchema = object({
    refrigerantType: string({
        message: 'Refrigerant type is required'
    }),
    electricalConnection: string({
        message: 'Electrical connection is required'
    })
})

export const hotWaterCylinderSchema = object({
    volume: number().int().positive(),
    material: string({
        message: 'Material is required'
    }),
    electricalHeaterPower: number().int().positive(),
    electricalConnection: string({
        message: 'Electrical connection is required'
    })
})

export const bufferTankSchema = object({
    volume: number().int().positive(),
    material: string({
        message: 'Material is required'
    })
})

const baseItemPayload = object({
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
        isArchived: boolean({
            message: 'Is archived value is required'
        }).default(false)
    })

const payload = {
    body: z.discriminatedUnion('category', [
        baseItemPayload.extend({
            category: z.literal(ItemCategory.OUTDOOR_UNIT),
            categorySpecificCharacteristics: outdoorUnitSchema
        }),
        baseItemPayload.extend({
            category: z.literal(ItemCategory.INDOOR_UNIT),
            categorySpecificCharacteristics: indoorUnitSchema
        }),
        baseItemPayload.extend({
            category: z.literal(ItemCategory.HYDROBOX),
            categorySpecificCharacteristics: hydroboxSchema
        }),
        baseItemPayload.extend({
            category: z.literal(ItemCategory.HOT_WATER_CYLINDER),
            categorySpecificCharacteristics: hotWaterCylinderSchema
        }),
        baseItemPayload.extend({
            category: z.literal(ItemCategory.BUFFER_TANK),
            categorySpecificCharacteristics: bufferTankSchema
        })
    ])
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

export type OutdoorUnitSpecs = z.infer<typeof outdoorUnitSchema>
export type IndoorUnitSpecs = z.infer<typeof indoorUnitSchema>
export type HydroboxSpecs = z.infer<typeof hydroboxSchema>
export type HotWaterCylinderSpecs = z.infer<typeof hotWaterCylinderSchema>
export type BufferTankSpecs = z.infer<typeof bufferTankSchema>