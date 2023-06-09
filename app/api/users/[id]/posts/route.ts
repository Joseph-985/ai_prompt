import { connectToDatabase } from "@utils/database";
import Prompt from "@models/prompt/prompt_model";

export type TParams = {
  params: { id: string };
};

export const GET = async (request: Request, { params }: TParams) => {
  console.log("params", params);
  try {
    await connectToDatabase();
    const prompts = await Prompt.find({ creator: params.id }).populate(
      "creator"
    );
    return new Response(JSON.stringify(prompts), { status: 200 });
  } catch (error) {
    return new Response("failed to fetch all prompts", { status: 500 });
  }
};
