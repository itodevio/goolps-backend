export interface ProductCategory {
  name: string;
}

export interface StoredProductCategory extends ProductCategory {
  _id: string;
}
