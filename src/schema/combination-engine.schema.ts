import { Item } from "@prisma/client";


export interface CombinationRequirements {
    requiredPower: number,
    requiredBufferTankVolume: number,
    requiredHotWaterCylinderVolume?: number,
    requiredHotWaterCylinderMaterial?: string
} 

export interface HvacCombination {
    brand: string;
    outdoorUnit: Item | null;
    hydrobox: Item | null;
    bufferTank: Item;
    hotWaterCylinder?: Item | null;
}