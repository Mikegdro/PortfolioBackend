import { relations } from 'drizzle-orm'
import { date } from 'drizzle-orm/pg-core'
import { pgTable, uuid, varchar } from 'drizzle-orm/pg-core'

export const Project = pgTable('project', {
  id: uuid('id').primaryKey(),
  name: varchar('description', { length: 256 })
})

export const PersonalProject = pgTable('personal_project', {
  id: uuid('personal_project_id').primaryKey(),
  idProject: uuid('project_id').references(() => Project.id).unique(),
  title: varchar('title', { length: 256 }).notNull(),
  repository: varchar('repository'),
  image: varchar('image'),
  imageReduced: varchar('image_reduce')
})

export const Company = pgTable('company', {
  id: uuid('id').primaryKey(),
  name: varchar('name').notNull(),
  linkedin: varchar('linkedn'),
  description: varchar('description'),
  logo: varchar('logo')
})

export const PrivateProject = pgTable('private_project', {
  id: uuid('private_project_id').primaryKey(),
  idProject: uuid('project_id').references(() => Project.id).unique(),
  title: varchar('title', { length: 256 }).notNull(),
  companyId: uuid('company_id').references(() => Company.id),
  startDate: date('start_date'),
  endDate: date('end_date')
})

export const projectsRelations = relations(Project, ({ many }) => ({
  PersonalProject: many(PersonalProject),
  PrivateProject: many(PrivateProject)
}))

export const companyRelations = relations(Company, ({ many }) => ({
  PrivateProject: many(PrivateProject)
}))

export const privateProjectsRelation = relations(PrivateProject, ({ one, many }) => ({
  Project: one(Project, { fields: [PrivateProject.idProject], references: [Project.id] }),
  Company: one(Company, { fields: [PrivateProject.companyId], references: [Company.id] })
}))

export const personalProjectsRelation = relations(PersonalProject, ({ one }) => ({
  Project: one(Project, { fields: [PersonalProject.idProject], references: [Project.id] })
}))