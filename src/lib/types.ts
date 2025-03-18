export type THomeMessages = {
    [key: string]: string
}

export type TPost = {
    id: string;
    title: string;
    content: string;
    createdAt: string | Date;
    authorName: string;
    authorId?: string;
    authorImage: string | null;
}

export type TGetPosts = {
    query: string;
}

export type TPostsResponse = {
    data?: TPost[];
    success: boolean;
    message?: string;
}

export type TPostPage = {
    data?: TPost;
    success: boolean;
    message?: string;
}


export type TNavigationLink = {
    id: number;
    label: string;
    url: string;
}

export type TInsertPost = {
    authorId: string;
    title: string;
    content: string;
}

export type TError = {
    error: string;
}

export type TComment = {
    id: string;
    content: string;
    authorId: string;
    authorName: string;
    authorImage: string | null;
    createdAt: string | Date;
}

export type TAuthorProps = {
    authorImage?: string | null;
    authorName?: string | null;
}

export type TCommentUpdateData = {
    newComment: string;
    id: string;
}

export type TAddNewCommentProps = {
    authorImage?: string | null;
    authorId?: string;
    postId: string;
}

export type TAddNewCommentData = {
    author: string;
    post: string;
    content: string;
}

// db schema types

export type TCommentDB = {
    id: string;
    author: string;
    postId: string;
    content: string;
    createdAt: Date;
}

export type TUpdateCommentPromise = {
    data?: TCommentDB; 
    success: boolean; 
    message: string
}