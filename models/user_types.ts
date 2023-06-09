import { Document, Model } from "mongoose";

interface IUser {
  email: string;
  username: string;
  image: string;
}

export interface IUserDocument extends IUser, Document {}
export interface IUserModel extends Model<IUserDocument> {}
