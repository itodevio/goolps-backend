import { Request, Response } from "express";
import { Order } from "./interface";
import OrderModel from "./model";

export const get = async (req: Request, res: Response) => {
  try {
    const orders = await OrderModel.find().populate("products");
    return res.status(200).json(orders);
  } catch (error) {
    return res.status(500).send();
  }
};

export const getById = async (req: Request, res: Response) => {
  const { orderId } = req.params;

  try {
    const order = await OrderModel.find({ _id: orderId });
    return res.status(200).json(order);
  } catch (error) {
    return res.status(500).send();
  }
};

export const store = async (req: Request, res: Response) => {
  const orderReq = req.body as Order;
  if (!orderReq || !orderReq.tableNumber) return res.status(400).send();
  try {
    const newOrder = await new OrderModel(orderReq).save();
    return res.status(200).json(newOrder);
  } catch (error) {
    return res.status(500).send();
  }
};

export const update = async (req: Request, res: Response) => {
  const { orderId } = req.params;
  const fieldsToUpdate = req.body;
  if (!orderId) return res.status(400).send();

  try {
    const updatedOrder = await OrderModel.findOneAndUpdate(
      { _id: orderId },
      { $set: fieldsToUpdate },
      { new: true }
    );
    return res.status(200).json(updatedOrder);
  } catch (error) {
    return res.status(500).send();
  }
};

export const remove = async (req: Request, res: Response) => {
  const { orderId } = req.params;
  if (!orderId) return res.status(400).send();

  try {
    await OrderModel.deleteOne({ _id: orderId });
    return res.status(200).send();
  } catch (error) {
    return res.status(500).send();
  }
};
