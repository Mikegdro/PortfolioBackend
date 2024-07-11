import { relations } from 'drizzle-orm'
import { pgSchema } from 'drizzle-orm/pg-core'
import { uniqueIndex, numeric, boolean, date, uuid, varchar } from 'drizzle-orm/pg-core'

export const ApiSchema = pgSchema('api')

/** ================================= USERS ==================================== */
export const User = ApiSchema.table('user', {
  id: uuid('id').primaryKey().defaultRandom(),
  userName: varchar('user_name').notNull(),
  email: varchar('email').notNull(),
  createdAt: date('created_at').defaultNow(),
  updatedAt: date('updated_at').defaultNow(),
  password: varchar('password'),
  admin: boolean('isAdmin').default(false)
}, (table) => {
  return {
    nameIdx: uniqueIndex('username_idx').on(table.userName),
    emailIdx: uniqueIndex('email_idx').on(table.email)
  }
})

/** ================================= PROJECTS ==================================== */
export const ProjectType = ApiSchema.enum('project_type', ['private', 'personal'])

export const Project = ApiSchema.table('project', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: varchar('description', { length: 256 }),
  type: ProjectType('type')
}, (table) => {
  return {
    nameIndex: uniqueIndex('project_name_idx').on(table.name)
  }
})

export const PersonalProject = ApiSchema.table('personal_project', {
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

export const PrivateProject = ApiSchema.table('private_project', {
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

export const Company = ApiSchema.table('company', {
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

export const Rol = ApiSchema.enum('rol', ['Frontend', 'Backend', 'Fullstack'])

export const Achievement = ApiSchema.table('achievement', {
  id: uuid('id').primaryKey().defaultRandom(),
  projectId: uuid('project_id').references(() => Project.id),
  title: varchar('title').notNull(),
  description: varchar('description'),
  rol: Rol('rol')
}, (table) => {
  return {
    titleIdx: uniqueIndex('ach_title_index').on(table.title),
    rolIdx: uniqueIndex('rol_index').on(table.rol)
  }
})

/** ================================= Project & Achievement Relation ==================================== */

export const achievementProjectRelation = relations(Achievement, ({ one }) => ({
  Project: one(Project)
}))

/** ================================= EDUCATION ==================================== */

export const Education = ApiSchema.table('education', {
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
    titleIdx: uniqueIndex('edu_title_index').on(table.title)
  }
})

export const Course = ApiSchema.table('course', {
  id: uuid('id').primaryKey().defaultRandom(),
  title: varchar('title').notNull(),
  description: varchar('description'),
  instructor: varchar('instructor'),
  link: varchar('link'),
  linkedin: varchar('linkedin')
}, (table) => {
  return {
    titleIdx: uniqueIndex('course_title_index').on(table.title)
  }
})

/** ================================= TECNOLOGIES ==================================== */

/** ================================= PROJECTS ==================================== */
/** ================================= PROJECTS ==================================== */
