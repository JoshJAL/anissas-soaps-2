export type Inventory = {
  id: number;
  name: string;
  createdAt: string;
  price: number;
  hidden: boolean;
};

export type InventoryImages = {
  id: number;
  inventoryId: number;
  createdAt: string;
  url: string;
  main: boolean;
};
