import { Item, ItemCategory } from "@prisma/client";
import { BufferTankSpecs, HotWaterCylinderSpecs, HydroboxSpecs, IndoorUnitSpecs, OutdoorUnitSpecs } from "../schema/item.schema.js";
import { BUFFER_TANK_RANGE_VALUES, DHW_VOLUME_RANGE_VALUES, MAX_POWER_OVERSIZING_RATIO } from "../constants/hvac.math.constants.js";
import { number } from "zod";
import { CombinationRequirements, HvacCombination } from "../schema/combination-engine.schema.js";


export function findCompatibleOutdoorUnits(
    brandItems: Item[],
    requiredPower: number
): Item[] {

    return brandItems.filter(item => {
        if(item.category !== ItemCategory.OUTDOOR_UNIT) return false

        const specs = item.categorySpecificCharacteristics as unknown as OutdoorUnitSpecs

        if(!specs || typeof specs.nominalPower !== 'number') return false

        const canCoverRequiredPower = specs.nominalPower >= requiredPower

        const isWithinReasonableSize = specs.nominalPower <= requiredPower * MAX_POWER_OVERSIZING_RATIO

        return canCoverRequiredPower && isWithinReasonableSize
    })
}

export function findCompatibleIndoorUnits(
    brandItems: Item[],
    outdoorUnit: Item,
    requiredVolume: number
): Item[] {

    if(!requiredVolume || requiredVolume <= 0) return []

    const minimalVolume = requiredVolume * DHW_VOLUME_RANGE_VALUES.MINIMAL_VOLUME_MODIFIER
    const maximalVolume = requiredVolume * DHW_VOLUME_RANGE_VALUES.MAXIMAL_VOLUME_MODIFIER

    const outdoorUnitSpecs = outdoorUnit.categorySpecificCharacteristics as unknown as OutdoorUnitSpecs
    const outdoorUnitRefrigerantType = outdoorUnitSpecs.refrigerantType

    return brandItems.filter(item => {
        if(item.category !== ItemCategory.INDOOR_UNIT) return false

        const specs = item.categorySpecificCharacteristics as unknown as IndoorUnitSpecs

        if(outdoorUnitRefrigerantType && specs.refrigerantType !== outdoorUnitRefrigerantType) return false

        if(!specs || typeof specs.hotWaterCylinderVolume !== 'number') return false

        const isWithinVolumeRange = minimalVolume <= specs.hotWaterCylinderVolume && specs.hotWaterCylinderVolume <= maximalVolume

        if(!isWithinVolumeRange) return false

        return true
    })

}

export function findCompatibleHydroboxes(
    brandItems: Item[],
    outdoorUnit: Item,
): Item[] {

    const outdoorUnitSpecs = outdoorUnit.categorySpecificCharacteristics as unknown as OutdoorUnitSpecs
    const outdoorUnitRefrigerantType = outdoorUnitSpecs.refrigerantType

    return brandItems.filter(item => {
        if(item.category !== ItemCategory.HYDROBOX) return false

        const specs = item.categorySpecificCharacteristics as unknown as HydroboxSpecs

        if(!specs) return false

        if(outdoorUnitRefrigerantType && specs.refrigerantType !== outdoorUnitRefrigerantType) return false

        return true
    })
}

    export function findCompatibleHotWaterCylinders(
        brandItems: Item[],
        requiredVolume: number,
        requiredMaterial?: string
    ): Item[] | null {

        if(!requiredVolume || requiredVolume <= 0) return null

        const minimalVolume = requiredVolume * DHW_VOLUME_RANGE_VALUES.MINIMAL_VOLUME_MODIFIER
        const maximalVolume = requiredVolume * DHW_VOLUME_RANGE_VALUES.MAXIMAL_VOLUME_MODIFIER

        const compatibleCylinders = brandItems.filter(item => {

            if(item.category !== ItemCategory.HOT_WATER_CYLINDER) return false

            const specs = item.categorySpecificCharacteristics as unknown as HotWaterCylinderSpecs

            if(!specs || typeof specs.volume !== 'number') return false

            const isWithinVolumeRange = specs.volume >= minimalVolume && specs.volume <= maximalVolume

            if(!isWithinVolumeRange) return false

            if(requiredMaterial && (requiredMaterial !== specs.material)) return false

            return true
        })

        return compatibleCylinders.length > 0 ? compatibleCylinders : null
    }

    export function findCompatibleBufferTanks(
        brandItems: Item[],
        requiredVolume: number
    ): Item[] {

        if(!requiredVolume || typeof requiredVolume !== 'number') return []

        const minimalBufferVolume = requiredVolume * BUFFER_TANK_RANGE_VALUES.MINIMAL_VOLUME_MODIFIER
        const maximalBufferVolume = requiredVolume * BUFFER_TANK_RANGE_VALUES.MAXIMAL_VOLUME_MODIFIER

        const compatibleBufferTanks = brandItems.filter(item => {

            if(item.category !== ItemCategory.BUFFER_TANK) return false

            const specs = item.categorySpecificCharacteristics as unknown as BufferTankSpecs

            if(!specs || typeof specs.volume !== 'number') return false

            const isWithinVolumeRange = specs.volume >= minimalBufferVolume && specs.volume <= maximalBufferVolume

            if(!isWithinVolumeRange) return false

            return true
        })

        return compatibleBufferTanks
    }

export function generateValidCombinations(
    brandItemsMap: Map<string, Item[]>,
    requirements: CombinationRequirements
): HvacCombination[] {

    const validCombinations: HvacCombination[] = []

    for(const [brandName, brandItems] of brandItemsMap.entries()) {

        const compatibleOutdoorUnits = findCompatibleOutdoorUnits(brandItems, requirements.requiredPower)
        if(compatibleOutdoorUnits.length === 0) continue

        const compatibleBufferTanks = findCompatibleBufferTanks(brandItems, requirements.requiredBufferTankVolume)
        if(compatibleBufferTanks.length === 0) continue

        let compatibleHotWaterCylinders: (Item | null)[] = [null]
        
        if(requirements.requiredHotWaterCylinderVolume && requirements.requiredHotWaterCylinderVolume > 0) {
            const foundHotWaterCylinder = findCompatibleHotWaterCylinders(
                brandItems,
                requirements.requiredHotWaterCylinderVolume,
                requirements.requiredHotWaterCylinderMaterial
            )

            if(foundHotWaterCylinder && foundHotWaterCylinder.length > 0) {
                compatibleHotWaterCylinders = foundHotWaterCylinder
            } else continue

        }

        for(const outdoorUnit of compatibleOutdoorUnits) {

            const compatibleHydroboxes = findCompatibleHydroboxes(brandItems, outdoorUnit)

            const requiredIndoorUnitVolume = requirements.requiredHotWaterCylinderVolume ?? 0
            const compatibleIndoorUnits = findCompatibleIndoorUnits(brandItems, outdoorUnit, requiredIndoorUnitVolume)

            if(compatibleHydroboxes.length > 0) {
                for(const hydrobox of compatibleHydroboxes) {
                    for(const bufferTank of compatibleBufferTanks) {
                        for(const hotWaterCylinder of compatibleHotWaterCylinders) {

                            validCombinations.push({
                                brand: brandName,
                                outdoorUnit,
                                hydrobox,
                                indoorUnit: null,
                                bufferTank,
                                hotWaterCylinder: hotWaterCylinder || null
                            })
                        }
                    }
                }
            }

            if(compatibleIndoorUnits.length > 0) {
                for(const indoorUnit of compatibleIndoorUnits) {
                    for(const bufferTank of compatibleBufferTanks) {

                        validCombinations.push({
                            brand: brandName,
                            outdoorUnit,
                            hydrobox: null,
                            indoorUnit,
                            bufferTank,
                            hotWaterCylinder: null
                        })
                    }
                }
            }
        }
    }

    return validCombinations
}