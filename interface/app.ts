export type TParams = {
  params: { id: string };
};

export interface IPost {
  prompt: string;
  tag: string;
}

export interface IPostUser {
  _id: string;
  creator: { _id: string; username: string; image: string; email: string };
  prompt: string;
  tag: string;
}

export type TEdit = {
  params: { prompt: string; tag: string; id: string };
};

export interface IPromptFeeds {
  creator: { _id: string; username: string; image: string; email: string };
  prompt: string;
  tag: string;
  _id: string;
}

export interface IPromptList {
  data: IPromptFeeds[];
  handleTagClick(tag: string): void;
}
