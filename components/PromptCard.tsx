"use client";
import React, { useState } from "react";

import Image from "next/image";

import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";

import { IPromptFeeds } from "@interface/app";

interface IProps {
  prompt: IPromptFeeds;
  handleEdit(id: string): void;
  handleDelete(id: string): void;
  handleTagClick?(tag: string): void;
}

const PromptCard = ({
  prompt,
  handleTagClick,
  handleEdit,
  handleDelete,
}: IProps) => {
  const [copied, setCopied] = useState<string>("");
  const { data: session } = useSession();
  const pathName = usePathname();
  const router = useRouter();

  const handleCopy = () => {
    setCopied(prompt.prompt);
    navigator.clipboard.writeText(prompt.prompt);
    setTimeout(() => {
      setCopied("");
    }, 3000);
  };

  const handleRedirectToUserProfile = () => {
    if (prompt.creator._id === session?.user.id) return router.push("/profile");
    router.push(
      `/profile/${prompt.creator._id}?name=${prompt.creator.username}`
    );
  };

  return (
    <div className="prompt_card">
      <div className="flex justify-between items-start gap-5">
        <div className="flex-1 flex justify-start items-center gap-3 cursor-pointer">
          <Image
            src={prompt.creator.image}
            alt="User image"
            width={40}
            height={40}
            className="rounded-full object-contain cursor-pointer"
            onClick={handleRedirectToUserProfile}
          />
          <div className="flex flex-col">
            <h3 className="font-satoshi font-semibold text-gray-900">
              {prompt.creator.username}
            </h3>
            <p className="font-inter text-sm text-gray-500">
              {prompt.creator.email}
            </p>
          </div>
        </div>
        <div className="copy_btn" onClick={handleCopy}>
          <Image
            src={
              copied === prompt.prompt
                ? "/assets/icons/tick.svg"
                : "assets/icons/copy.svg"
            }
            alt="copy"
            width={12}
            height={12}
          />
        </div>
      </div>
      <p className="my-4 font-satoshi text-sm text-gray-700">{prompt.prompt}</p>
      <p
        className="font-inter text-sm blue_gradient cursor-pointer"
        onClick={() => handleTagClick && handleTagClick(prompt.tag)}
      >
        {prompt.tag}
      </p>
      {session?.user.id === prompt.creator._id && pathName === "/profile" && (
        <div className="mt-5 flex-center gap-4 border-t border-gray-100 pt-3">
          <p
            className="font-inter text-sm green_gradient cursor-pointer"
            onClick={() => {
              handleEdit(prompt._id);
            }}
          >
            Edit
          </p>
          <p
            className="font-inter text-sm orange_gradient cursor-pointer"
            onClick={() => {
              handleDelete(prompt._id);
            }}
          >
            Delete
          </p>
        </div>
      )}
    </div>
  );
};

export default PromptCard;
