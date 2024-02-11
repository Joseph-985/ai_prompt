import React from "react";

import PromptCard from "./PromptCard";

import { IPostUser } from "@interface/app";

interface IProps {
  name: string;
  desc: string;
  data: IPostUser[];
  handleEdit(id: string): void;
  handleDelete(id: string): void;
  handleTagClick?(tag: string): void;
}

const Profile = ({
  name,
  desc,
  data,
  handleEdit,
  handleDelete,
  handleTagClick,
}: IProps) => {
  console.log("data", data);
  return (
    <section className="w-full">
      <h1 className="head_text text-left">
        <span className="blue_gradient">{name} Profile</span>
      </h1>
      <p className="desc text-left">{desc}</p>
      <div className="mt-10 prompt_layout">
        {data.map((prompt) => (
          <PromptCard
            key={prompt._id}
            prompt={prompt}
            handleTagClick={handleTagClick}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
          />
        ))}
      </div>
    </section>
  );
};

export default Profile;
