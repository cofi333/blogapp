import { TNavigationLink } from "./types";
import {z} from "zod"

export const NAVIGATION_LINKS: TNavigationLink[] = [
    {
        id: 1,
        label: "Feed",
        url: "/home"
    },
    {
        id: 2,
        label: "Create a post",
        url: "/home/article/create"
    },
  
]

export const CREATE_POST_SCHEMA = z.object({
    authorId: z.string(),
    title: z.string().min(3, {message: "Title must have at least 3 characters"}).max(30, {message: "Title must have at least 30 characters"}),
    content: z.string().min(15, {message: "Content must have at least 15 characters"})
})

export const ADD_COMMENT_SCHEMA = z.object({
    author: z.string(),
    post: z.string(),
    content: z.string().min(3, {message: "Comment must have at least 5 characters"})
})

export const UPDATE_COMMENT_SCHEMA = z.object({
    id: z.string(),
    newComment: z.string().min(3, {message: "New comment must have at least 5 characters"})
})