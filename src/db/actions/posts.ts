"use server"
import { eq, ilike, or } from "drizzle-orm";
import { db } from "..";
import { posts, users } from "../schema";
import { TInsertPost } from "@/lib/types";

export const getPosts = async (query: string) => {
    try {
        const data = await db
        .select({
            id: posts.id,
            title: posts.title,
            authorName: users.name,
            authorImage: users.image,
            content: posts.content,
            createdAt: posts.createdAt,
        })
        .from(posts)
        .innerJoin(users, eq(posts.author, users.id)).where(or(ilike(posts.title, `%${query}%`), ilike(posts.content, `%${query}%`)));

        return { data: data, success: true }
    } catch (error) {
        return { data: [], success: false, message:"Something went wrong while fetching posts. Please try again" }
    }
};

export const getPostById = async (id: string) => {
    try {
        const data = await db.select({
            id: posts.id,
            title: posts.title,
            authorName: users.name,
            authorId: users.id,
            authorImage: users.image,
            content: posts.content,
            createdAt: posts.createdAt,
        }).from(posts).where(eq(posts.id, id)).innerJoin(users, eq(posts.author, users.id))

        return { data: data, success: true }
    } catch(error) {
        return { data: [], success: false, message:"Something went wrong. Please try again" }
    }
}

export const deletePost = async (id: string) => {
     try {
        await db.delete(posts).where(eq(posts.id, id))

        return {
            success: true,
            message: "You successfuly deleted your post"
        }
     } catch(error) {
        return {
            success: false,
            message: "Something went wrong. Please try again"
        }
     } 
}

export const insertPost = async(data: TInsertPost) => {
    try{
        const {authorId, title, content} = data;
        await db.insert(posts).values({author: authorId, title: title, content: content})
         return {
            success: true,
            message: "You successfully added a new post"
        }
    } catch(error) {
        return {
            success: false,
            message: "Something went wrong. Please try again"
        }
    }
}