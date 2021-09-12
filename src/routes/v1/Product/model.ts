import { Schema, model } from "mongoose";
import { ProductSchema } from "./interface";

const ProductSchema = new Schema<ProductSchema>({
  name: { type: String, required: true },
  price: Number,
  category: { type: Schema.Types.ObjectId, ref: "ProductCategory" },
  ingredients: [{ type: Schema.Types.ObjectId, ref: "Ingredient" }],
  description: String,
});

const ProductModel = model<ProductSchema>("Product", ProductSchema);

export default ProductModel;
