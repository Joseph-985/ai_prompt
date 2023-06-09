import { model, models } from "mongoose";
import { IUserDocument } from "./user_types";
import UserSchema from "./user_schema";

export const UserModel =
  models.User || model<IUserDocument>("User", UserSchema);
