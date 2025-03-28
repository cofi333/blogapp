export type THomeMessages = {
  [key: string]: string;
};

export type TPost = {
  id: string;
  title: string;
  content: string;
  createdAt: string | Date;
  authorName: string;
  authorId?: string;
  authorImage: string | null;
};

export type TGetPosts = {
  query: string;
};

export type TPostsResponse = {
  data?: TPost[];
  success: boolean;
  message?: string;
};

export type TPostPage = {
  data?: TPost;
  success: boolean;
  message?: string;
};

export type TNavigationLink = {
  id: number;
  label: string;
  url: string;
};

export type TInsertPost = {
  authorId: string;
  title: string;
  content: string;
};

export type TError = {
  error: string;
};

export type TComment = {
  id: string;
  content: string;
  authorId: string;
  authorName: string;
  authorImage: string | null;
  lastEdited?: Date | null;
  createdAt: string | Date;
};

export type TAuthorProps = {
  authorImage?: string | null;
  authorName?: string | null;
};

export type TCommentUpdateData = {
  newComment: string;
  id: string;
};

export type TAddNewCommentProps = {
  authorImage?: string | null;
  authorId?: string;
  postId: string;
};

export type TAddNewCommentData = {
  author: string;
  post: string;
  content: string;
};

export type TReactions = {
  success: boolean;
  data?: {
    likes: number;
    dislikes: number;
    isReacted: number | null;
    commentId: string;
    message?: string;
  };
};

export type TCommentProps = {
  data: TComment;
  sessionId?: string;
  reactions: TReactions;
};

export type TReactionButtonProps = {
  type: 'like' | 'dislike';
  userId: string;
  reactions: TReactions;
  commentId: string;
};

// db schema types

export type TCommentDB = {
  id: string;
  author: string;
  postId: string;
  content: string;
  createdAt: Date;
};

export type TUpdateCommentPromise = {
  data?: TCommentDB;
  success: boolean;
  message: string;
};

export type TGetReactions = {
  success: boolean;
  data: {
    likes: number;
    dislikes: number;
    commentId: string;
    isReacted: number | null;
  };
};
