export type THomeMessages = {
    [key: string]: string
}

export type TPost = {
    id: string;
    title: string;
    content: string;
    createdAt: string | Date;
    authorName: string;
    authorImage: string | null;
}

export type TGetPosts = {
    query: string;
}