import { Document, Schema, model } from "mongoose";
import { ProductCategory } from "./interface";

const ProductCategorySchema = new Schema<ProductCategory>({
  name: { type: String, required: true },
});

const ProductCategoryModel = model<ProductCategory>(
  "ProductCategory",
  ProductCategorySchema
);

export default ProductCategoryModel;
