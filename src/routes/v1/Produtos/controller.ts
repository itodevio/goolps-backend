import { Request, Response } from "express";

export const get_products = async (req: Request, res: Response) => {
  return res.status(200).send({ products: 'ok' });
}