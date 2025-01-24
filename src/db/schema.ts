import {
  pgTable,
  serial,
  timestamp,
  text,
  integer,
  pgEnum,
} from "drizzle-orm/pg-core";

export const statusEnum = pgEnum("status", [
  "open",
  "void",
  "paid",
  "uncollectible",
]);

export const Invoices = pgTable("invoices", {
  id: serial("id").primaryKey().notNull(),
  createTs: timestamp("createTs").defaultNow().notNull(),
  value: integer("value").notNull(),
  description: text("description").notNull(),
  status: statusEnum("status").notNull(),
});
