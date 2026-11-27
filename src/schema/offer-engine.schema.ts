
export interface OfferLineOverrides {
    discount?: number
}

export interface BuildOfferSnapshotOptions {
    offerDiscountPercent?: number
    capturedAt?: string
    lineOverrideByItemId?: Record<string, OfferLineOverrides>
}