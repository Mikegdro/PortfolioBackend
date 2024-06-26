import { relations } from "drizzle-orm";
import { pgEnum } from "drizzle-orm/pg-core";
import { uuid } from "drizzle-orm/pg-core";
import { serial, text, timestamp, integer, pgTable } from "drizzle-orm/pg-core";

export const projects = pgTable('projects', {
    id: uuid('id').primaryKey(),
    description: text('description'),
    updated_at: timestamp('updated_at').defaultNow(),
    created_at: timestamp('created_at').defaultNow(),
});

export const personalProject = pgTable('personalProject', {
    id: serial('id').primaryKey(),
    projectId: uuid('id').notNull().references(() => projects.id),
    title: text('title'),
    repository: text('repository'),
    image: text('image'),
    image_reduced: text('image_reduced') 
});

export const company = pgTable('company', {
    id: uuid('id').primaryKey(),
    name: text('name'),
    linkedin: text('linkedin'),
    description: text('description'),
    logo: text('logo')
});

export const privateProject = pgTable('privateProject', {
    id: serial('id').primaryKey(),
    projectId: uuid('id').notNull().references(() => projects.id),
    title: text('title'),
    company: uuid('id').notNull().references(() => company.id),
    startDate: timestamp('startDate'),
    endDate: timestamp('endDate')
});

