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