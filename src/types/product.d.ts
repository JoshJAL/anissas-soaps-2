import type { Inventory, InventoryImages } from '@prisma/client';

export type ProductAndMainImage = {} & Inventory & InventoryImages;
