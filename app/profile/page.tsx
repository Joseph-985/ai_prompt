"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";

import Profile from "@components/Profile";

export interface IPost {
  _id: string;
  creator: { _id: string; username: string; image: string; email: string };
  prompt: string;
  tag: string;
}

const ProfilPage = () => {
  const [userPrompts, setUserPrompts] = useState<IPost[]>([]);
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    const fetchPrompt = async () => {
      console.log("first");
      const response = await fetch(`/api/users/${session?.user.id}/posts`);
      if (response.ok) {
        const data = await response.json();
        console.log("responseData", data);
        setUserPrompts(data);
      } else {
        throw new Error("failed to fetch prompt");
      }
    };
    if (session?.user.id) fetchPrompt();
  }, []);

  const handleEdit = (id: string) => {
    router.push(`/update-prompt?id=${id}`);
  };
  const handleDelete = async (id: string) => {
    const confirmDelete = confirm("Are you sure you want to this post");

    if (confirmDelete) {
      try {
        const res = await fetch(`/api/prompt/${id.toString()}`, {
          method: "DELETE",
        });

        const filteredPrompt = userPrompts.filter((p) => p._id !== id);
        setUserPrompts(filteredPrompt);

        console.log("res", res);
      } catch (error: any) {
        console.log(error);
      }
    }
  };
  return (
    <Profile
      name="My"
      desc="Welcome to your personalised profile"
      data={userPrompts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
};

export default ProfilPage;
