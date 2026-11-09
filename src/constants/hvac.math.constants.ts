import { climateZoneEnum } from "./hvac.constants.js";

export const HOUSE_BASE_THERMAL_LOADS = {
    [climateZoneEnum.PLAINS]: 100,
    [climateZoneEnum.MODERATE]: 115,
    [climateZoneEnum.MOUNTAIN]: 130,
    [climateZoneEnum.HIGH_MOUNTAIN]: 145
} as const  

export const APARTMENT_BASE_THERMAL_LOADS = {
    [climateZoneEnum.PLAINS]: 80,
    [climateZoneEnum.MODERATE]: 95,
    [climateZoneEnum.MOUNTAIN]: 110,
    [climateZoneEnum.HIGH_MOUNTAIN]: 125
} as const

export const HVAC_MODIFIERS = {
    TOP_OR_BOTTOM_FLOOR: 1.12,
    NEAR_WATER: 1.08
} as const

export const DHW_CALCULATION_CONSTANTS = {
    LITTERS_PER_BATH: 100,
    LITTERS_PER_HABITANT: 70,
    CONCURRENCY_FACTOR: 0.8,
}

export const MAX_POWER_OVERSIZING_RATIO = 1.20

export const DHW_VOLUME_RANGE_VALUES = {
    MINIMAL_VOLUME_MODIFIER: 0.9,
    MAXIMAL_VOLUME_MODIFIER: 1.2
}

export const BUFFER_TANK_RANGE_VALUES = {
    MINIMAL_VOLUME_MODIFIER: 0.7,
    MAXIMAL_VOLUME_MODIFIER: 1.2
}