import { Document, Schema, model } from "mongoose";
import { ProductSchema } from "./interface";

const ProductSchema = new Schema<ProductSchema>({
  name: { type: String, required: true },
  category: { type: Schema.Types.ObjectId, ref: "ProductCategory" },
  ingredients: [{ type: Schema.Types.ObjectId, ref: "Ingredient" }],
});

const ProductModel = model<ProductSchema>("Product", ProductSchema);

export default ProductModel;
