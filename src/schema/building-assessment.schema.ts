import z, { any, boolean, int, number, object, record, string } from "zod";
import { BuildingType, buildingTypeEnum, climateZoneEnum, ClimateZoneType, installationType, installationTypeEnum } from "../constants/hvac.constants.js";

export const manualInputDataSchema = object({
    buildingType: z.enum(Object.values(buildingTypeEnum) as [BuildingType, ...BuildingType[]], {
        message: 'Building type is required'
    }),
    isTopOrBottomFloor: boolean().default(false),
    area: number({
        message: 'Area is required'
    }).int('Area must be an integer').positive('Area must be positive number'),
    insulationWidth: number().int('Insulation width must be an integer').nonnegative().default(0),
    installationType: z.enum(Object.values(installationTypeEnum) as [installationType, ...installationType[]], {
        message: 'Installation type is required'
    }),
    climateZone: z.enum(Object.values(climateZoneEnum) as [ClimateZoneType, ...ClimateZoneType[]], {
        message: 'Climate zone is required'
    }),
    nearWater: boolean().default(false),
    baths: number().int('Number of baths must be integer').nonnegative().optional(),
    habitants: number().int('Number of habitants must be integer').nonnegative().optional()
})

const payload = {
    body: object({
        name: string({
            message: 'Name is required'
        }),
        manualInputData: manualInputDataSchema,
        manualCalculatedPower: number({
            message: 'Manual calculated power is required'
        }).positive('Manual calculated power must be positive number'),
        manualCalculatedDHWVolume: number().int('DHW volume should be an integer')
                                    .positive('DHW volume should be positive number')
                                    .optional()
                                    .nullable(),
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

export const createBuildingAssessmentSchema = object({
    ...payload
})

export const updateBuildingAssessmentSchema = object({
    ...payload,
    ...params
})

export const getBuildingAssessmentSchema = object({
    ...params
})

export const deleteBuildingAssessmentSchema = object({
    ...params
})

export type CreateBuildingAssessmentInput = z.infer<typeof createBuildingAssessmentSchema>
export type UpdateBuildingAssessmentInput = z.infer<typeof updateBuildingAssessmentSchema>
export type GetBuildingAssessmentInput = z.infer<typeof getBuildingAssessmentSchema>
export type DeleteBuildingAssessmentInput = z.infer<typeof deleteBuildingAssessmentSchema>
export type ManualInputDataType = z.infer<typeof manualInputDataSchema>