import { Request, Response } from "express";

export const get_orders = async (req: Request, res: Response) => {
  return res.status(200).send({ orders: 'ok' });
}