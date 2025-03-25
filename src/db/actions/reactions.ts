"use server";
import { and, count, eq } from "drizzle-orm";
import { db } from "..";
import { reactions } from "../schema";

export const checkReactionStatus = async (userId: string, commentId: string) => {
    try{
        const data = await db.select().from(reactions).where(and(eq(reactions.userId, userId), eq(reactions.commentId, commentId)))
        return {
            success: true,
            data: data[0] || null
        }
    } catch(error) {
        return {
            success: false,
            message: "Something went wrong. Please try again"
        }
    }
}

export const updateReactionStatus = async (userId: string, commentId: string, status: number | null) => {
    try{
        await db.update(reactions).set({reaction: status}).where(and(eq(reactions.userId, userId), eq(reactions.commentId, commentId)))
        return {
            success: true,
        }
    } catch(error) {
        return {
            success: false,
            message: "Something went wrong. Please try again"
        }
    }
}
export const insertReaction = async(userId: string, commentId: string, reaction: number) => {
    try {
        const isAlreadyReacted = await checkReactionStatus(userId, commentId);

        if (!isAlreadyReacted.data) 
            await db.insert(reactions).values({ userId: userId, commentId: commentId, reaction: reaction });
        else if (isAlreadyReacted.data.reaction === reaction) 
            await updateReactionStatus(userId, commentId, null);
        else 
            await updateReactionStatus(userId, commentId, reaction);
        
        return {
            success: true,
        };
    } catch (error) {
        console.log(error)
        return {
            success: false,
            message: "Something went wrong. Please try again",
        };
    }
};

export const getReactions = async (commentId: string, userId: string) => {
    try{
        const queryLikes = await db.select({
            likes: count()
        }).from(reactions).where(and(eq(reactions.reaction, 1), eq(reactions.commentId, commentId)))

        const queryDislikes = await db.select({
            dislikes: count()
        }).from(reactions).where(and(eq(reactions.commentId, commentId), eq(reactions.reaction, 0)))

        const queryStatus = await db.select().from(reactions).where(and(eq(reactions.commentId, commentId), eq(reactions.userId, userId)))

        const likes = queryLikes[0]?.likes || 0;
        const dislikes = queryDislikes[0]?.dislikes || 0
        const isReacted = queryStatus[0].reaction

        return {
            success: true,
            data: {
                likes: likes,
                dislikes: dislikes,
                isReacted: isReacted,
                commentId: commentId,
            }
        }
    } catch(error) {
        return {
            success: false,
            message: "Something went wrong. Please try again"
        }
    }
}

