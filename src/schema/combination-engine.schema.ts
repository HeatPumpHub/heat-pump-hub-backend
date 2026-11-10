

export interface ProjectRequirements {
    requiredPower: number,
    requiredBufferTankVolume: number,
    requiredHotWaterCylinderVolume?: number,
    requiredHotWaterCylinderMaterial?: string
} 

export interface HvacCombination {
    brand: string;
    outdoorUnit: Item;
    hydrobox: Item;
    bufferTank: Item;
    dhwTank?: Item | null;
}