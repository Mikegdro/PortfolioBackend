import { pgTable, uuid, varchar, integer } from "drizzle-orm/pg-core";
import { eq } from "drizzle-orm";

import db from "../db";

const Project = pgTable('project', {
    id: uuid('id').primaryKey(),
    name: varchar('description', { length: 256 }),
})

type Project = typeof Project.$inferSelect

const PersonalProject = pgTable('personal_project', {
    id: uuid('personal_project_id').primaryKey(),
    idProject: uuid('project_id').references(() => Project.id).primaryKey(),
    title: varchar('title', { length: 256 }).notNull(),
    repository: varchar('repository'),
    image: varchar('image'),
    imageReduced: varchar('image_reduce')
})

const Company = pgTable('company', {
    id: uuid('id').primaryKey(),
    name: varchar('name').notNull(),
    linkedin: varchar('linkedn'),
    description: varchar('description'),
    logo: varchar('logo')
})

const PrivateProject = pgTable('private_project', {
    id: uuid('personal_project_id').primaryKey(),
    idProject: uuid('project_id').references(() => Project.id).primaryKey(),
    title: varchar('title', { length: 256 }).notNull(),
    companyId: uuid('company_id').references(() => Company.id)
})

export async function retrieveAllProjects(): Promise<Project[]> {
    return await db.select().from(Project)
}