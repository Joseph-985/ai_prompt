import { Document, Model } from "mongoose";

export interface IPrompt {
  creator: string;
  prompt: string;
  tag: string;
}

export interface IPromptDocument extends IPrompt, Document {}
export interface IPromptModel extends Model<IPromptDocument> {}
