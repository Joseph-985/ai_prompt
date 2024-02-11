"use client";

import { FormEvent, useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import Form from "@components/Form";

import { IPost } from "@interface/app";

const UpdatePrompt = () => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>();
  const [post, setPost] = useState<IPost>({ prompt: "", tag: "" });

  const router = useRouter();
  const searchParams = useSearchParams();
  const promptId = searchParams.get("id");

  useEffect(() => {
    const getPromptDetails = async () => {
      try {
        const response = await fetch(`/api/prompt/${promptId}`);
        const data = await response.json();
        setPost({ prompt: data?.prompt, tag: data?.tag });
      } catch (error: any) {
        console.log(error.message);
      }
    };
    if (promptId) getPromptDetails();
  }, [promptId]);

  const updatePrompt = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    if (!promptId) return alert("Prompt ID not specified");
    try {
      const response = await fetch(`/api/prompt/${promptId}`, {
        method: "PATCH",
        body: JSON.stringify({
          prompt: post.prompt,
          tag: post.tag,
        }),
      });

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
        typeOf="Edit"
        post={post}
        setPost={setPost}
        submitting={isSubmitting}
        handleSubmit={updatePrompt}
      />
    </>
  );
};

export default UpdatePrompt;
