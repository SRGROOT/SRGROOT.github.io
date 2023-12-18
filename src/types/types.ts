export type CategoryItem = {
  id: number;
  value: string;
  subItems: CategoryItem[] | null;
};

export interface CatalogItem {
  id: number;
  name: string;
  image: string;
  description: string;
  price: number;
  vendorCode: number;
  categoryId: number;
  subCategoryId: number | null;
}

export interface CartItem extends CatalogItem {
  amount: number;
}
