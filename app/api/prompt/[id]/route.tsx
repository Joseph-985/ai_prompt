import { connectToDatabase } from "@utils/database";
import Prompt from "@models/prompt/prompt_model";
import { TParams } from "@app/api/users/[id]/posts/route";

type TEdit = {
  params: { prompt: string; tag: string; id: string };
};

export const GET = async (request: Request, { params }: TParams) => {
  try {
    await connectToDatabase();
    const prompt = await Prompt.findById({ _id: params.id }).populate(
      "creator"
    );
    if (!prompt) return new Response("prompt not found", { status: 400 });
    return new Response(JSON.stringify(prompt), { status: 200 });
  } catch (error) {
    return new Response("failed to fetch all prompt", { status: 500 });
  }
};

export const PATCH = async (request: Request, { params }: TEdit) => {
  const { prompt, tag } = await request.json();
  try {
    await connectToDatabase();
    const existingPrompt = await Prompt.findById({ _id: params.id });
    if (!existingPrompt)
      return new Response("prompt not found", { status: 400 });

    existingPrompt.prompt = prompt;
    existingPrompt.tag = tag;

    await existingPrompt.save();

    return new Response(JSON.stringify(prompt), { status: 200 });
  } catch (error) {
    return new Response("failed to update prompt", { status: 500 });
  }
};

export const DELETE = async (request: Request, { params }: TParams) => {
  try {
    await connectToDatabase();
    await Prompt.findByIdAndRemove({ _id: params.id });
    return new Response("Prompt Deleted successfully", { status: 200 });
  } catch (error) {
    return new Response("Unable to delete prompt", { status: 500 });
  }
};
