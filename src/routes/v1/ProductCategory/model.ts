import { Document, Schema, model } from "mongoose";
import { ProductCategory } from "./interface";

const ProductCategorySchema = new Schema<ProductCategory>({
  displayName: { type: String, required: true },
  normalizedName: { type: String, required: true },
});

const ProductCategoryModel = model<ProductCategory>(
  "ProductCategory",
  ProductCategorySchema
);

export default ProductCategoryModel;
