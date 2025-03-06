"use server"
import { eq, ilike, or } from "drizzle-orm";
import { db } from "..";
import { posts, users } from "../schema";
import { redirect } from "next/navigation";

export const getPosts = async (query: string) => {
    return await db
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
};

export const getPostById = async (id: string) => {
    return await db.select({
        id: posts.id,
        title: posts.title,
        authorName: users.name,
        authorImage: users.image,
        content: posts.content,
        createdAt: posts.createdAt,
    }).from(posts).where(eq(posts.id, id)).innerJoin(users, eq(posts.author, users.id))
}

export const deletePost = async (id: string) => {
     await db.delete(posts).where(eq(posts.id, id))
     redirect("/home?status=2")
}