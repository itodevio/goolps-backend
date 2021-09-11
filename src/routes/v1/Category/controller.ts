import { Request, Response } from "express";
import { ProductCategory } from "./interface";
import ProductCategoryModel from "./model";

export const get = async (req: Request, res: Response) => {
  try {
    const categories = await ProductCategoryModel.find({}).exec();
    return res.status(200).json(categories);
  } catch (error) {
    return res.status(500).send();
  }
};

export const store = async (req: Request, res: Response) => {
  const categoryReq = req.body as ProductCategory;
  if (!categoryReq || !categoryReq.name) return res.status(400).send();
  try {
    const newCategory = await new ProductCategoryModel(categoryReq).save();
    return res.status(200).json(newCategory);
  } catch (error) {
    return res.status(500).send();
  }
};

export const update = async (req: Request, res: Response) => {
  const { categoryId } = req.params;
  const fieldsToUpdate = req.body;
  if (!categoryId || Object.keys(fieldsToUpdate).length == 0) return res.status(400).send();

  try {
    const updatedcategory = await ProductCategoryModel.findOneAndUpdate(
      { _id: categoryId },
      { $set: fieldsToUpdate },
      { new: true }
    );
    return res.status(200).json(updatedcategory);
  } catch (error) {
    return res.status(500).send();
  }
};

export const remove = async (req: Request, res: Response) => {
  const { categoryId } = req.params;
  if (!categoryId) return res.status(400).send();

  try {
    await ProductCategoryModel.deleteOne({ _id: categoryId });
    return res.status(200).send();
  } catch (error) {
    return res.status(500).send();
  }
};
