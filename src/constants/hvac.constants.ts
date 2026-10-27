export const buildingTypeEnum = {
    HOUSE: 'HOUSE',
    APARTMENT: 'APARTMENT'
} as const

export type BuildingType = keyof typeof buildingTypeEnum

export const climateZoneEnum = {
    PLAINS: 'PLAINS',
    MODERATE: 'MODERATE',
    MOUNTAIN: 'MOUNTAIN',
    HIGH_MOUNTAIN: 'HIGH_MOUNTAIN'
} as const

export type ClimateZoneType = keyof typeof climateZoneEnum

export const installationTypeEnum = {
    UNDERFLOOR_HEATING: 'UNDERFLOOR_HEATING',
    FAN_COILS: 'FAN_COILS',
    RADIATORS: 'RADIATORS'
}

export type installationTypeEnum = keyof typeof installationTypeEnum