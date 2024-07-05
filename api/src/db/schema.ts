import { relations } from 'drizzle-orm'
import { uniqueIndex } from 'drizzle-orm/pg-core'
import { integer } from 'drizzle-orm/pg-core'
import { numeric } from 'drizzle-orm/pg-core'
import { boolean } from 'drizzle-orm/pg-core'
import { pgEnum } from 'drizzle-orm/pg-core'
import { date } from 'drizzle-orm/pg-core'
import { pgTable, uuid, varchar } from 'drizzle-orm/pg-core'

/** ================================= USERS ==================================== */
export const User = pgTable('user', {
  id: uuid('id').primaryKey().defaultRandom(),
  userName: varchar('user_name').notNull(),
  email: varchar('email').notNull(),
  createdAt: date('created_at').defaultNow(),
  updatedAt: date('updated_at').defaultNow(),
  password: varchar('password'),
  admin: boolean('isAdmin').default(false),
}, (table) => {
  return {
    nameIdx: uniqueIndex('username_idx').on(table.userName),
    emailIdx: uniqueIndex('email_idx').on(table.email)
  }
})

/** ================================= PROJECTS ==================================== */
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

/** ================================= Company ==================================== */

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


/** ================================= Project & Company Relations ==================================== */

export const projectsRelations = relations(Project, ({ many, one }) => ({
  PersonalProject: one(PersonalProject),
  PrivateProject: one(PrivateProject),
  Achievement: many(Achievement)
}))

export const companyRelations = relations(Company, ({ many }) => ({
  PrivateProject: many(PrivateProject)
}))

export const privateProjectsRelation = relations(PrivateProject, ({ one }) => ({
  Project: one(Project, { fields: [PrivateProject.idProject], references: [Project.id] }),
  Company: one(Company, { fields: [PrivateProject.companyId], references: [Company.id] })
}))

export const personalProjectsRelation = relations(PersonalProject, ({ one }) => ({
  Project: one(Project, { fields: [PersonalProject.idProject], references: [Project.id] })
}))

/** ================================= ACHIEVEMENTS ==================================== */

export const Rol = pgEnum('rol', ['Frontend', 'Backend', 'Fullstack'])

export const Achievement = pgTable('achievement', {
  id: uuid('id').primaryKey().defaultRandom(),
  projectId: uuid('id').references(() => Project.id),
  title: varchar('title').notNull(),
  description: varchar('description'),
  rol: Rol('rol')
}, (table) => {
  return {
    titleIdx: uniqueIndex('title_index').on(table.title),
    rolIdx: uniqueIndex('rol_index').on(table.rol)
  }
})

/** ================================= Project & Achievement Relation ==================================== */

export const achievementProjectRelation = relations(Achievement, ({ one }) => ({
  Project: one(Project)
}))

/** ================================= EDUCATION ==================================== */

export const Education = pgTable('education', {
  id: uuid('id').primaryKey().defaultRandom(),
  title: varchar('title').notNull(),
  description: varchar('description'),
  web: varchar('web'),
  linkedin: varchar('linkedin'),
  score: numeric('score'),
  startDate: date('start_date'),
  endDate: date('end_date')
}, (table) => {
  return {
    titleIdx: uniqueIndex('title_index').on(table.title)
  }
})

export const Course = pgTable('course', {
  id: uuid('id').primaryKey().defaultRandom(),
  title: varchar('title').notNull(),
  description: varchar('description'),
  instructor: varchar('instructor'),
  link: varchar('link'),
  linkedin: varchar('linkedin')
}, (table) => {
  return {
    titleIdx: uniqueIndex('title_index').on(table.title)
  }
})

/** ================================= TECNOLOGIES ==================================== */

/** ================================= PROJECTS ==================================== */
/** ================================= PROJECTS ==================================== */
