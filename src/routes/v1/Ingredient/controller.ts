import { Request, Response } from "express";
import { Ingredient } from "./interface";
import IngredientModel from "./model";

export const get = async (req: Request, res: Response) => {
  try {
    const ingredients = await IngredientModel.find({}).exec();
    return res.status(200).json(ingredients);
  } catch (error) {
    return res.status(500).send();
  }
};

export const store = async (req: Request, res: Response) => {
  const ingredientReq = req.body as Ingredient;
  if (!ingredientReq || !ingredientReq.name) return res.status(400).send();
  try {
    const newIngredient = await new IngredientModel(ingredientReq).save();
    return res.status(200).json(newIngredient);
  } catch (error) {
    return res.status(500).send();
  }
};

export const update = async (req: Request, res: Response) => {
  const ingredientReq = req.body as Ingredient;
  const { ingredientId } = req.params;
  const fieldsToUpdate = req.body;
  if (!ingredientId || !ingredientReq.name) return res.status(400).send();

  try {
    const updatedIngredient = await IngredientModel.findOneAndUpdate(
      { _id: ingredientId },
      { $set: fieldsToUpdate },
      { new: true }
    );
    return res.status(200).json(updatedIngredient);
  } catch (error) {
    return res.status(500).send();
  }
};

export const remove = async (req: Request, res: Response) => {
  const { ingredientId } = req.params;
  if (!ingredientId) return res.status(400).send();

  try {
    await IngredientModel.deleteOne({ _id: ingredientId });
    return res.status(200).send();
  } catch (error) {
    return res.status(500).send();
  }
};
