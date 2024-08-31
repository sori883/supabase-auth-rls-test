import { pgTable, timestamp, uuid, text } from "drizzle-orm/pg-core";
import { users } from "./users";

export const example = pgTable("example_table", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.userId),
  todoName: text("todo_name").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});
