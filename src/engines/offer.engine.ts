import { Item } from "@prisma/client";
import { HvacCombination } from "../schema/combination-engine.schema.js";
import { BuildOfferSnapshotOptions, OfferLineOverrides } from "../schema/offer-engine.schema.js";
import { offerSnapshotSchema } from "../schema/offer.schema.js";


function roundMoney(value: number): number {
    return Math.round(value * 100) / 100
}

export function extractCombinationItems(combination: HvacCombination): Item[] {

    const potentialItems: (Item | null)[] = [
        combination.outdoorUnit,
        combination.hydrobox,
        combination.indoorUnit,
        combination.bufferTank,
        combination.hotWaterCylinder || null
    ] 

    return potentialItems.filter((potentialItem): potentialItem is Item => potentialItem !== null)
}
    function mapItemToSnapshotLine(item: Item, overrides?: OfferLineOverrides) {

        const rawPrice = Number((item as Item & { price?: unknown }).price ?? 0)
        const unitBasePrice = roundMoney(rawPrice)

        const quantity = 1
        const lineDiscount = overrides?.discount ?? 0

        const grossLineTotal = unitBasePrice * quantity
        const lineTotalPrice = roundMoney(grossLineTotal * (1 - lineDiscount / 100))

        return {
            itemId: item.id,
            name: item.name,
            quantity,
            basePrice: unitBasePrice,
            discount: lineDiscount,
            totalPrice: lineTotalPrice
        }
    }

    export function buildOfferSnapshotAndPricing(combination: HvacCombination, options: BuildOfferSnapshotOptions = {}) {
        const {
            offerDiscountPercent = 0,
            capturedAt = new Date().toISOString(),
            lineOverrideByItemId = {}
        } = options

        const items = extractCombinationItems(combination)

        const snapshotItems = items.map((item) => 
            mapItemToSnapshotLine(item, lineOverrideByItemId[item.id])
        )

        const offerSnapshot = offerSnapshotSchema.parse({
            items: snapshotItems,
            capturedAt
        })

        const basePrice = roundMoney(
            snapshotItems.reduce((sum, line) => sum + line.totalPrice, 0)
        )
        const totalPrice = roundMoney(
            basePrice * (1 - offerDiscountPercent / 100)
        )

        return {
            offerSnapshot,
            basePrice,
            totalPrice
        }
    }