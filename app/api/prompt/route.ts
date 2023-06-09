import { connectToDatabase } from "@utils/database";
import Prompt from "@models/prompt/prompt_model";

export const GET = async (request: Request) => {
  try {
    await connectToDatabase();
    const prompts = await Prompt.find({}).populate("creator");
    return new Response(JSON.stringify(prompts), { status: 200 });
  } catch (error) {
    return new Response("failed to fetch all prompts", { status: 500 });
  }
};
