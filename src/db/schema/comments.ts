import { pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';
import { posts } from './posts';
import { users } from './users';
import { relations } from 'drizzle-orm';

export const comments = pgTable('comments', {
  id: uuid('id').primaryKey().defaultRandom(),
  author: text('authorID')
    .references(() => users.id)
    .notNull(),
  postId: uuid('postId')
    .references(() => posts.id, { onDelete: 'cascade' })
    .notNull(),
  content: text('content').notNull(),
  lastEdited: timestamp('lastEdited'),
  createdAt: timestamp('createdAt').defaultNow().notNull(),
});

// RELATIONS
export const CommentPostsTable = relations(comments, ({ one }) => {
  return {
    user: one(users),
    post: one(posts),
  };
});
