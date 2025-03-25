'use server';
import { eq } from 'drizzle-orm';
import { db } from '..';
import { comments, users } from '../schema';
import {
  TUpdateCommentPromise,
  TCommentUpdateData,
  TAddNewCommentData,
} from '@/lib/types';
import { revalidateTag } from 'next/cache';
import { unstable_cache } from 'next/cache';

export const getCommentsByPost = async (id: string) => {
  try {
    const data = await db
      .select({
        id: comments.id,
        content: comments.content,
        authorId: users.id,
        authorName: users.name,
        authorImage: users.image,
        createdAt: comments.createdAt,
        lastEdited: comments.lastEdited,
      })
      .from(comments)
      .innerJoin(users, eq(comments.author, users.id))
      .where(eq(comments.postId, id));

    return { data: data, success: true };
  } catch (error) {
    return {
      data: [],
      success: false,
      message: 'Something went wrong while fetching comments. Please try again',
    };
  }
};

export const getCommentsData = unstable_cache(
  async (postId: string) => getCommentsByPost(postId),
  [],
  {
    tags: ['comments'],
  },
);

export const updateCommentById = async (
  updateData: TCommentUpdateData,
): Promise<TUpdateCommentPromise> => {
  try {
    const data = await db
      .update(comments)
      .set({ content: updateData.newComment, lastEdited: new Date() })
      .where(eq(comments.id, updateData.id))
      .returning();

    return {
      data: data[0],
      success: true,
      message: 'You successfully updated your comment',
    };
  } catch (error) {
    return {
      success: false,
      message:
        'Something went wrong while updating the comment. Please try again',
    };
  }
};

export const deleteCommentById = async (id: string) => {
  try {
    await db.delete(comments).where(eq(comments.id, id));

    return {
      success: true,
      message: 'You successfuly deleted your comment',
    };
  } catch (error) {
    return {
      success: false,
      message: 'Something went wrong. Please try again',
    };
  }
};

export const addNewComment = async (data: TAddNewCommentData) => {
  try {
    await db.insert(comments).values({
      author: data.author,
      postId: data.post,
      content: data.content,
    });

    return {
      success: true,
      message: 'You successfully added a new comment',
    };
  } catch (error) {
    return {
      success: false,
      message: 'Something went wrong. Please try again',
    };
  }
};

//revalidating data
export const revalidateComments = async () => {
  revalidateTag('comments');
};
