import { Document, Schema, model } from "mongoose";
import { Ingredient } from "./interface";

const IngredientSchema = new Schema<Ingredient>({
  name: { type: String, required: true },
  qtt: Number,
  unit: String,
  lotNumber: Number,
  description: String,
});

const IngredientModel = model<Ingredient>("Ingredient", IngredientSchema);

export default IngredientModel;
