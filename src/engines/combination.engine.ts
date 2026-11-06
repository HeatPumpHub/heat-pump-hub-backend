import { Item, ItemCategory } from "@prisma/client";
import { OutdoorUnitSpecs } from "../schema/item.schema.js";
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