import { BuildingType, buildingTypeEnum, ClimateZoneType } from "../constants/hvac.constants.js"
import { APARTMENT_BASE_THERMAL_LOADS, HOUSE_BASE_THERMAL_LOADS } from "../constants/hvac.math.constants.js"
import { AppError } from "../errors/app.error.js"


function calculateInsulationCoefficient(insulationWidth: number): number {
    if(insulationWidth === 0) return 1

    const thermalLoadReductionPerMm = 0.0025
    const maxThermalLoadReduction = 0.52

    const totalThermalLoadReduction = Math.min(insulationWidth * thermalLoadReductionPerMm, maxThermalLoadReduction)
    return 1 - totalThermalLoadReduction
}

function getBaseThermalLoad(buildingType: BuildingType, climateZone: ClimateZoneType): number {

    if(buildingType === buildingTypeEnum.HOUSE) { 
        return HOUSE_BASE_THERMAL_LOADS[climateZone as keyof typeof HOUSE_BASE_THERMAL_LOADS] 
    } else if(buildingType === buildingTypeEnum.APARTMENT) {
        return APARTMENT_BASE_THERMAL_LOADS[climateZone as keyof typeof APARTMENT_BASE_THERMAL_LOADS]
    }
    
    throw new AppError(`Unsupported building type: ${buildingType}`, 400)
}