"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";

import Profile from "@components/Profile";

import { IPostUser } from "@interface/app";

interface IParams {
  params: {
    userId: string;
  };
}

const UserProfilPage = ({ params }: IParams) => {
  const [userPrompts, setUserPrompts] = useState<IPostUser[]>([]);
  const router = useRouter();
  const searchParam = useSearchParams();
  const username = searchParam.get("name");

  useEffect(() => {
    const fetchPrompt = async () => {
      const response = await fetch(`/api/users/${params.userId}/posts`);
      if (response.ok) {
        const data = await response.json();
        setUserPrompts(data);
      } else {
        throw new Error("failed to fetch prompt");
      }
    };
    if (params.userId) fetchPrompt();
  }, [params]);

  const handleEdit = (id: string) => {
    router.push(`/update-prompt?id=${id}`);
  };
  const handleDelete = async (id: string) => {
    const confirmDelete = confirm("Are you sure you want to delete this post");

    if (confirmDelete) {
      try {
        const res = await fetch(`/api/prompt/${id.toString()}`, {
          method: "DELETE",
        });

        const filteredPrompt = userPrompts.filter((p) => p._id !== id);
        setUserPrompts(filteredPrompt);
      } catch (error: any) {
        console.log(error);
      }
    }
  };
  return (
    <Profile
      name={username ? username : ""}
      desc="Welcome to your personalised profile"
      data={userPrompts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
};

export default UserProfilPage;
