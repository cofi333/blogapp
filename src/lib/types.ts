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

