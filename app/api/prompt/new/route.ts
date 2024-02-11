// import { NextApiRequest } from "next";
import { connectToDatabase } from "@utils/database";
import Prompt from "@models/prompt/prompt_model";

export const POST = async (req: Request) => {
  const { userId, prompt, tag } = await req.json();
  try {
    await connectToDatabase();
    const newPrompt = new Prompt({ creator: userId, prompt, tag: tag });
    await newPrompt.save();
    return new Response(JSON.stringify(newPrompt), { status: 201 });
  } catch (error: any) {
    return new Response("failed to create a new prompt", { status: 500 });
  }
};
