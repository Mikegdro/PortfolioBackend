import { Project, PersonalProject, PrivateProject, Experience, Company, Tecnology } from './db/schema'

export type Project = typeof Project.$inferSelect
export type NewProject = typeof Project.$inferInsert

export type PersonalProject = typeof PersonalProject.$inferSelect
export type NewPersonalProject = typeof PersonalProject.$inferInsert

export type PrivateProject = typeof PrivateProject.$inferSelect
export type NewPrivateProject = typeof PrivateProject.$inferInsert

export type Experience = typeof Experience.$inferSelect
export type NewExperience = typeof Experience.$inferInsert

export type Company = typeof Company.$inferSelect
export type NewCompany = typeof Company.$inferInsert

export type Tecnologies = typeof Tecnology.$inferSelect
export type NewTecnology = typeof Tecnology.$inferInsert
