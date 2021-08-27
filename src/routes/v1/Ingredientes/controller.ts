import { Request, Response } from "express";

export const get_ingredients = async (req: Request, res: Response) => {
  return res.status(200).send({ ingredients: 'ok' });
}