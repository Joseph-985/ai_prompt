import { IPromptDocument } from "./prompt_types";
import { model, models } from "mongoose";
import PromptSchema from "./prompt_schema";

const Prompt = models.prompt || model<IPromptDocument>("prompt", PromptSchema);

export default Prompt;
