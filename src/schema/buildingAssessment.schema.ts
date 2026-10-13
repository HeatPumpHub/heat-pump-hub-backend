import z, { any, boolean, number, object, record, string } from "zod";


const payload = {
    body: object({
        name: string({
            message: 'Name is required'
        }),
        manualInputData: record(string(), any(), {
            message: 'Manual input data is required'
        }),
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