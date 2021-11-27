import { Document, Schema, model } from "mongoose";
import { User } from "./interface";

const UserSchema = new Schema<User>({
  firstName: String,
  lastName: String,
  email: String,
  role: {
    type: String,
    enum: ["UNREGISTERED", "REGISTERED", "ADMIN"],
  },
});

const UserModel = model<User>("User", UserSchema);

export default UserModel;
