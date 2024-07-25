import { relations } from 'drizzle-orm'
import { pgSchema, uniqueIndex, numeric, boolean, date, uuid, varchar, primaryKey } from 'drizzle-orm/pg-core'

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
  name: varchar('name', { length: 256 }),
  type: ProjectType('type')
}, (table) => {
  return {
    nameIndex: uniqueIndex('project_name_idx').on(table.name)
  }
})

/** ================================= Tecnologies ==================================== */

export const TechType = ApiSchema.enum('tech_type', ['frontend', 'backend', 'devops'])

export const Tecnology = ApiSchema.table('tecnology', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: varchar('name').notNull(),
  type: TechType('tech_type'),
  description: varchar('description'),
  site: varchar('site'),
  twitter: varchar('twitter'),
  logo: varchar('logo')
}, (table) => {
  return {
    nameIdx: uniqueIndex('tecnology_name_idx').on(table.name)
  }
})

export const tecnologyToProject = ApiSchema.table('tecnology_to_project', {
  projectId: uuid('project_id').notNull().references(() => Project.id, { onDelete: 'cascade' }),
  tecnologyId: uuid('tecnology_id').notNull().references(() => Tecnology.id, { onDelete: 'cascade' })
}, (table) => ({
  pk: primaryKey({ columns: [table.projectId, table.tecnologyId] })
}))

export const PersonalProject = ApiSchema.table('personal_project', {
  id: uuid('personal_project_id').primaryKey().defaultRandom(),
  idProject: uuid('project_id').references(() => Project.id, { onDelete: 'cascade' }),
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
  idProject: uuid('project_id').references(() => Project.id, { onDelete: 'cascade' }),
  title: varchar('title', { length: 256 }).notNull(),
  companyId: uuid('company_id').references(() => Company.id, { onDelete: 'set null' }),
  experienceId: uuid('experience_id').references(() => Experience.id, { onDelete: 'set null' }),
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

/** ================================= Achievements ==================================== */

export const Rol = ApiSchema.enum('rol', ['Frontend', 'Backend', 'Fullstack'])

export const Achievement = ApiSchema.table('achievement', {
  id: uuid('id').primaryKey().defaultRandom(),
  projectId: uuid('project_id').references(() => Project.id, { onDelete: 'cascade' }),
  title: varchar('title').notNull(),
  description: varchar('description'),
  rol: Rol('rol')
}, (table) => {
  return {
    titleIdx: uniqueIndex('ach_title_index').on(table.title),
    rolIdx: uniqueIndex('rol_index').on(table.rol)
  }
})

/** ================================= Education ==================================== */

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

/** ================================= Courses ==================================== */

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

/** ================================= Experience ==================================== */

export const Role = ApiSchema.enum('role', ['frontend', 'backend', 'devops', 'fullstack'])

export const Experience = ApiSchema.table('experience', {
  id: uuid('id').primaryKey().defaultRandom(),
  role: Role('role').notNull(),
  description: varchar('description'),
  companyId: uuid('company_id').references(() => Company.id, { onDelete: 'cascade' }).notNull(),
  startDate: varchar('start_date'),
  endDate: varchar('end_date')
})

/** ================================= Relations ==================================== */

// Projects
export const projectsRelations = relations(Project, ({ many, one }) => ({
  PersonalProject: one(PersonalProject),
  PrivateProject: one(PrivateProject),
  Achievement: many(Achievement),
  tecnologyToProject: many(tecnologyToProject)
}))

export const privateProjectsRelation = relations(PrivateProject, ({ one }) => ({
  Project: one(Project, { fields: [PrivateProject.idProject], references: [Project.id] }),
  Company: one(Company, { fields: [PrivateProject.companyId], references: [Company.id] }),
  Experience: one(Experience, { fields: [PrivateProject.experienceId], references: [Experience.id] })
}))

export const personalProjectsRelation = relations(PersonalProject, ({ one }) => ({
  Project: one(Project, { fields: [PersonalProject.idProject], references: [Project.id] })
}))

// Tecnologies
export const tecnologiesRelations = relations(Tecnology, ({ many }) => ({
  tecnologyToProject: many(tecnologyToProject)
}))

// ManyToMany Tec-proj
export const tecnologyToProjectRelations = relations(tecnologyToProject, ({ one }) => ({
  tecnology: one(Tecnology, {
    fields: [tecnologyToProject.tecnologyId],
    references: [Tecnology.id]
  }),
  project: one(Project, {
    fields: [tecnologyToProject.projectId],
    references: [Project.id]
  })
}))

// Company
export const companyRelations = relations(Company, ({ many, one }) => ({
  PrivateProject: many(PrivateProject),
  Experience: many(Experience)
}))

// Experience
export const experienceRelations = relations(Experience, ({ one, many }) => ({
  Company: one(Company, { fields: [Experience.companyId], references: [Company.id] }),
  PrivateProject: many(PrivateProject)
}))

// Achievement
export const achievementProjectRelation = relations(Achievement, ({ one }) => ({
  Project: one(Project, { fields: [Achievement.projectId], references: [Project.id] })
}))
