import { Item, ItemCategory } from "@prisma/client";
import { BufferTankSpecs, HotWaterCylinderSpecs, HydroboxSpecs, OutdoorUnitSpecs } from "../schema/item.schema.js";
import { BUFFER_TANK_RANGE_VALUES, DHW_VOLUME_RANGE_VALUES, MAX_POWER_OVERSIZING_RATIO } from "../constants/hvac.math.constants.js";
import { number } from "zod";


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

export function findCompatibleHydroboxes(
    brandItems: Item[],
    outdoorUnit: Item,
): Item[] {

    const outdoorUnitSpecs = outdoorUnit.categorySpecificCharacteristics as unknown as OutdoorUnitSpecs
    const outdoorUnitRefrigerantType = outdoorUnitSpecs?.refrigerantType

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

    export function findCompatibleBufferVessels(
        brandItems: Item[],
        requiredVolume: number
    ): Item[] {

        if(!requiredVolume || typeof requiredVolume !== 'number') return []

        const minimalBufferVolume = requiredVolume * BUFFER_TANK_RANGE_VALUES.MINIMAL_VOLUME_MODIFIER
        const maximalBufferVolume = requiredVolume * BUFFER_TANK_RANGE_VALUES.MAXIMAL_VOLUME_MODIFIER

        const compatibleBufferVessels = brandItems.filter(item => {

            if(item.category !== ItemCategory.BUFFER_TANK) return false

            const specs = item.categorySpecificCharacteristics as unknown as BufferTankSpecs

            if(!specs || typeof specs.volume !== 'number') return false

            const isWithinVolumeRange = specs.volume >= minimalBufferVolume && specs.volume <= maximalBufferVolume

            if(!isWithinVolumeRange) return false

            return true
        })

        return compatibleBufferVessels
    }