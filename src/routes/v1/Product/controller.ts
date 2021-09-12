import { Request, Response } from "express";
import IngredientModel from "../Ingredient/model";
import ProductCategoryModel from "../ProductCategory/model";
import { Product } from "./interface";
import ProductModel from "./model";

export const get = async (req: Request, res: Response) => {
  try {
    const products = await ProductModel.find().populate("category ingredients");
    return res.status(200).json(products);
  } catch (error) {
    return res.status(500).send();
  }
};

export const store = async (req: Request, res: Response) => {
  const productReq = req.body as Product;
  if (!productReq || !productReq.name || !productReq.category)
    return res.status(400).send();
  let productCategoryId: string;
  try {
    const normalizedCategoryName = productReq.category
      .normalize("NFD")
      .replace(/[^\w\s]/gi, "")
      .toLocaleLowerCase();
    const existingCategory = await ProductCategoryModel.findOne({
      normalizedName: normalizedCategoryName,
    });
    if (!existingCategory) {
      const newCategory = await new ProductCategoryModel({
        displayName: productReq.category,
        normalizedName: normalizedCategoryName,
      }).save();
      productCategoryId = newCategory._id;
    } else {
      productCategoryId = existingCategory._id;
    }
    productReq.category = productCategoryId;

    for (let i = 0; i < productReq.ingredients.length; i++) {
      await IngredientModel.updateOne(
        { _id: (productReq.ingredients[i] as any)._id },
        { $inc: { 'qtt': -(productReq.ingredients[i] as any).quantity } },
      );
    }
    productReq.ingredients = productReq.ingredients.map(i => (i as any)._id)
    const newProduct = await new ProductModel(productReq).save();
    return res.status(200).json(newProduct);
  } catch (error) {
    console.log(error);
    return res.status(500).send();
  }
};

export const update = async (req: Request, res: Response) => {
  console.log("algumacoisa", req.params);
  const productReq = req.body as Product;
  const { productId } = req.params;
  const fieldsToUpdate = req.body;
  if (!productId || !productReq.name) return res.status(400).send();
  let productCategoryId: string;

  try {
    const normalizedCategoryName = productReq.category
      .normalize("NFD")
      .replace(/[^\w\s]/gi, "")
      .toLocaleLowerCase();
    const existingCategory = await ProductCategoryModel.findOne({
      normalizedName: normalizedCategoryName,
    });
    if (!existingCategory) {
      const newCategory = await new ProductCategoryModel({
        displayName: productReq.category,
        normalizedName: normalizedCategoryName,
      }).save();
      productCategoryId = newCategory._id;
    } else {
      productCategoryId = existingCategory._id;
    }
    productReq.category = productCategoryId;

    const updatedProduct = await ProductModel.findOneAndUpdate(
      { _id: productId },
      { $set: fieldsToUpdate },
      { new: true }
    );
    return res.status(200).json(updatedProduct);
  } catch (error) {
    console.log(error)
    return res.status(500).send();
  }
};

export const remove = async (req: Request, res: Response) => {
  const { productId } = req.params;
  if (!productId) return res.status(400).send();

  try {
    await ProductModel.deleteOne({ _id: productId });
    return res.status(200).send();
  } catch (error) {
    return res.status(500).send();
  }
};
