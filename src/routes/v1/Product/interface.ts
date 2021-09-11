import { ProductCategory } from "../Category/interface";
import { Ingredient } from "../Ingredient/interface";

export interface Product {
  name: string;
  price: number;
  ingredients: Ingredient[];
  category: ProductCategory;
  description: string;
}

export interface StoredProduct extends Product {
  _id: string;
}
