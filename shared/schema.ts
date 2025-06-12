import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const consultations = pgTable("consultations", {
  id: serial("id").primaryKey(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  nationality: text("nationality"),
  programInterest: text("program_interest"),
  preferredDate: text("preferred_date"),
  preferredTime: text("preferred_time"),
  budgetRange: text("budget_range"),
  message: text("message"),
  status: text("status").default("pending"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const contacts = pgTable("contacts", {
  id: serial("id").primaryKey(),
  fullName: text("full_name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  program: text("program"),
  message: text("message").notNull(),
  status: text("status").default("pending"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const fundraisingCampaigns = pgTable("fundraising_campaigns", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  program: text("program").notNull(),
  story: text("story").notNull(),
  currentAmount: integer("current_amount").default(0),
  targetAmount: integer("target_amount").notNull(),
  currency: text("currency").notNull(),
  daysLeft: integer("days_left").notNull(),
  status: text("status").default("active"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const contributions = pgTable("contributions", {
  id: serial("id").primaryKey(),
  campaignId: integer("campaign_id").references(() => fundraisingCampaigns.id),
  contributorName: text("contributor_name").notNull(),
  contributorEmail: text("contributor_email").notNull(),
  amount: integer("amount").notNull(),
  message: text("message"),
  anonymous: boolean("anonymous").default(false),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertConsultationSchema = createInsertSchema(consultations).omit({
  id: true,
  status: true,
  createdAt: true,
});

export const insertContactSchema = createInsertSchema(contacts).omit({
  id: true,
  status: true,
  createdAt: true,
});

export const insertFundraisingCampaignSchema = createInsertSchema(fundraisingCampaigns).omit({
  id: true,
  currentAmount: true,
  status: true,
  createdAt: true,
});

export const insertContributionSchema = createInsertSchema(contributions).omit({
  id: true,
  createdAt: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertConsultation = z.infer<typeof insertConsultationSchema>;
export type Consultation = typeof consultations.$inferSelect;

export type InsertContact = z.infer<typeof insertContactSchema>;
export type Contact = typeof contacts.$inferSelect;

export type InsertFundraisingCampaign = z.infer<typeof insertFundraisingCampaignSchema>;
export type FundraisingCampaign = typeof fundraisingCampaigns.$inferSelect;

export type InsertContribution = z.infer<typeof insertContributionSchema>;
export type Contribution = typeof contributions.$inferSelect;
