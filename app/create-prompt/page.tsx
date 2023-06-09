"use client";

import { FormEvent, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import Form from "@components/Form";

export interface IPost {
  prompt: string;
  tag: string;
}

const CreatePrompt = () => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>();
  const [post, setPost] = useState<IPost>({ prompt: "", tag: "" });

  const { data: session } = useSession();
  const router = useRouter();

  const createPost = async (e: FormEvent) => {
    console.log("create post");
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/prompt/new", {
        method: "POST",
        body: JSON.stringify({
          userId: session?.user.id,
          prompt: post.prompt,
          tag: post.tag,
        }),
      });
      console.log("response", response);

      if (response.ok) {
        router.push("/");
      }
    } catch (error: any) {
      console.log(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Form
        typeOf="Create"
        post={post}
        setPost={setPost}
        submitting={isSubmitting}
        handleSubmit={createPost}
      />
    </>
  );
};

export default CreatePrompt;
