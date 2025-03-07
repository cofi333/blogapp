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