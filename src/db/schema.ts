import {
  pgTable,
  serial,
  timestamp,
  text,
  integer,
  pgEnum,
} from "drizzle-orm/pg-core";
import { STATUS_OPTIONS } from "@/data/invoices";

export type Status = (typeof STATUS_OPTIONS)[number]["id"];
const statues = STATUS_OPTIONS.map((status) => status.id) as Array<Status>;

export const statusEnum = pgEnum(
  "status",
  statues as [Status, ...Array<Status>]
);

export const Invoices = pgTable("invoices", {
  id: serial("id").primaryKey().notNull(),
  createTs: timestamp("createTs").defaultNow().notNull(),
  value: integer("value").notNull(),
  description: text("description").notNull(),
  userId: text("userId").notNull(),
  organizationId: text("oraganizationId"),
  customerId: integer("customerId")
    .notNull()
    .references(() => Customers.id),
  status: statusEnum("status").notNull(),
});

export const Customers = pgTable("customers", {
  id: serial("id").primaryKey().notNull(),
  createTs: timestamp("createTs").defaultNow().notNull(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  userId: text("userId").notNull(),
  organizationId: text("oraganizationId"),
});
