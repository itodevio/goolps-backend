import { Document, Schema, model } from "mongoose";
import { Product } from "./interface";

const ProductSchema = new Schema<Product>({
  name: { type: String, required: true },
  category: { type: Schema.Types.ObjectId, ref: "ProductCategory" },
  ingredients: [{ type: Schema.Types.ObjectId, ref: "Ingredient" }],
});

const ProductModel = model<Product>("Product", ProductSchema);

export default ProductModel;
