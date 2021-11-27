import { Request, Response } from "express";
import FirebaseAdmin from "../../../connection/Firebase.connection";
import { User, UserLoginRequest } from "./interface";
import UserModel from "./model";

export const get = async (req: Request, res: Response) => {
  try {
    const users = await UserModel.find({}).exec();
    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).send();
  }
};

export const register = async (req: Request, res: Response) => {
  const userBody: User = req.body;
  try {
    const { uid } = await FirebaseAdmin.auth().createUser({
      email: userBody.email,
      password: userBody.password,
    });
    await FirebaseAdmin.auth().setCustomUserClaims(uid, {
      role: userBody.role,
    });
    delete userBody.password;
    const newUser = await new UserModel(userBody).save();
    return res.status(201).send(newUser);
  } catch (error) {
    console.error("[Auth Controller - store]", error);
    return res.status(400).send();
  }
};

export const login = async (req: Request, res: Response) => {
  const userLoginBody: UserLoginRequest = req.body;
  try {
    const isUser = await UserModel.findOne({ email: userLoginBody.email });
    if (!isUser) return res.status(403).send();

    const tokenRes = await FirebaseAdmin.auth().verifyIdToken(
      userLoginBody.token
    );
    const rightUser = await UserModel.findOne({
      email: tokenRes.email,
    });
    if (!rightUser) return res.status(404).send();

    return res.status(200).json(rightUser);
  } catch (error) {
    console.error(error);
    return res.status(400).send();
  }
};

export const update = async (req: Request, res: Response) => {};

export const remove = async (req: Request, res: Response) => {};
