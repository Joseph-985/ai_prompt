"use client";

import React, { useState, useEffect, FormEvent } from "react";
import PromptCard from "./PromptCard";

import { IPromptFeeds, IPromptList } from "@interface/app";

const PromptCardList = ({ data, handleTagClick }: IPromptList) => {
  const handleEdit = () => {};

  const handleDelete = (id: string) => {};
  return (
    <div className="mt-16 prompt_layout">
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
  );
};

const Feeds = () => {
  const [searchValue, setSearchValue] = useState<string>();
  const [prompt, setPrompt] = useState<IPromptFeeds[]>([]);
  const [searchTimeout, setSearchTimeout] = useState<any>(null);
  const [searchResult, setSearchResult] = useState<IPromptFeeds[]>([]);

  useEffect(() => {
    const fetchPrompt = async () => {
      const response = await fetch("/api/prompt");
      if (response.ok) {
        const data = await response.json();
        setPrompt(data);
      } else {
        throw new Error("failed to fetch prompt");
      }
    };
    fetchPrompt();
  }, []);

  const filterPrompt = (searchVal: string) => {
    const regex = new RegExp(searchVal, "i");
    return prompt.filter(
      (value) =>
        regex.test(value.creator.username) ||
        regex.test(value.prompt) ||
        regex.test(value.tag)
    );
  };

  const handleSearch = (searchVal: string) => {
    clearTimeout(searchTimeout);
    setSearchValue(searchVal);

    setSearchTimeout(
      setTimeout(() => {
        const filteredPost = filterPrompt(searchVal);
        setSearchResult(filteredPost);
      }, 5000)
    );
  };

  const handleTagClick = (tagName: string) => {
    setSearchValue(tagName);
    const tagValue = filterPrompt(tagName);
    setSearchResult(tagValue);
  };

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="search for a tag or username"
          value={searchValue}
          onChange={(e) => {
            handleSearch(e.target.value);
          }}
          className="search_input peer"
        />
      </form>

      {searchValue ? (
        <PromptCardList data={searchResult} handleTagClick={handleTagClick} />
      ) : (
        <PromptCardList data={prompt} handleTagClick={handleTagClick} />
      )}
    </section>
  );
};

export default Feeds;
