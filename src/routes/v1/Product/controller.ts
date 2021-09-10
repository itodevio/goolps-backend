import { Request, Response } from "express";
import { Product } from "./interface";
import ProductModel from "./model";

export const get = async (req: Request, res: Response) => {
  try {
    const products = await ProductModel.find({}).exec();
    return res.status(200).json(products);
  } catch (error) {
    return res.status(500).send();
  }
};

export const store = async (req: Request, res: Response) => {
  const productReq = req.body as Product;
  if (!productReq || !productReq.name) return res.status(400).send();
  try {
    const newProduct = await new ProductModel(productReq).save();
    return res.status(200).json(newProduct);
  } catch (error) {
    return res.status(500).send();
  }
};

export const update = async (req: Request, res: Response) => {
  const { productId } = req.params;
  const fieldsToUpdate = req.body;
  if (!productId) return res.status(400).send();

  try {
    const updatedProduct = await ProductModel.findOneAndUpdate(
      { _id: productId },
      { $set: fieldsToUpdate },
      { new: true }
    );
    return res.status(200).json(updatedProduct);
  } catch (error) {
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
