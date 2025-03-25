import { pgTable, text, timestamp, uuid, integer } from 'drizzle-orm/pg-core';
import { users } from './users';
import { relations } from 'drizzle-orm';
import { comments } from './comments';

export const reactions = pgTable('reactions', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: text('userID')
    .references(() => users.id)
    .notNull(),
  commentId: uuid('commentId')
    .references(() => comments.id, { onDelete: 'cascade' })
    .notNull(),
  reaction: integer(),
});

// RELATIONS
export const reactionsPost = relations(reactions, ({ one }) => {
  return {
    user: one(users),
    comment: one(comments),
  };
});
