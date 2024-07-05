import { Project, PersonalProject, PrivateProject, ProjectType } from './db/schema'

export type Project = typeof Project.$inferSelect
export type NewProject = typeof Project.$inferInsert

export type PersonalProject = typeof PersonalProject.$inferSelect
export type NewPersonalProject = typeof PersonalProject.$inferInsert

export type PrivateProject = typeof PrivateProject.$inferSelect
export type NewPrivateProject = typeof PrivateProject.$inferInsert
