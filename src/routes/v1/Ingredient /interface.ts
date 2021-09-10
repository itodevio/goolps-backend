import { Unit } from "../../../interfaces/unit.interface";

export interface Ingredient {
  name: string;
  qtt: number;
  unit: Unit;
  lotNumber: number;
  description: string;
}

export interface StoredIngredient extends Ingredient {
  _id: string;
}
