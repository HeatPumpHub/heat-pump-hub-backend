import { Item, ItemCategory } from "@prisma/client";
import { HydroboxSpecs, OutdoorUnitSpecs } from "../schema/item.schema.js";
import { MAX_POWER_OVERSIZING_RATIO } from "../constants/hvac.math.constants.js";


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