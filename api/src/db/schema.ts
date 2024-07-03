import { relations } from 'drizzle-orm'
import { uniqueIndex } from 'drizzle-orm/pg-core'
import { pgEnum } from 'drizzle-orm/pg-core'
import { date } from 'drizzle-orm/pg-core'
import { pgTable, uuid, varchar } from 'drizzle-orm/pg-core'

export const ProjectType = pgEnum('project_type', ["private", "personal"])

export const Project = pgTable('project', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: varchar('description', { length: 256 }),
  type: ProjectType('type')
}, (table) => {
  return {
    nameIndex: uniqueIndex('name_idx').on(table.name)
  }
})

export const PersonalProject = pgTable('personal_project', {
  id: uuid('personal_project_id').primaryKey().defaultRandom(),
  idProject: uuid('project_id').references(() => Project.id).unique(),
  title: varchar('title', { length: 256 }).notNull(),
  repository: varchar('repository'),
  image: varchar('image'),
  imageReduced: varchar('image_reduce')
}, (table) => {
  return {
    titleIndex: uniqueIndex('personal_title_idx').on(table.title)
  }
})

export const Company = pgTable('company', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: varchar('name').notNull(),
  linkedin: varchar('linkedn'),
  description: varchar('description'),
  logo: varchar('logo')
}, (table) => {
  return {
    nameIndex: uniqueIndex('company_name_idx').on(table.name)
  }
})

export const PrivateProject = pgTable('private_project', {
  id: uuid('private_project_id').primaryKey().defaultRandom(),
  idProject: uuid('project_id').references(() => Project.id).unique(),
  title: varchar('title', { length: 256 }).notNull(),
  companyId: uuid('company_id').references(() => Company.id),
  startDate: date('start_date'),
  endDate: date('end_date')
}, (table) => {
  return {
    titleIndex: uniqueIndex('private_title_idx').on(table.title)
  }
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
