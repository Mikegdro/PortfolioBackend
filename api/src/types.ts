import { Project, PersonalProject, PrivateProject } from "./db/schema"

export type Project = typeof Project.$inferSelect

export type PersonalProject = typeof PersonalProject.$inferSelect

export type PrivateProject = typeof PrivateProject.$inferSelect

export interface ProjectJoined extends Project {
  PersonalProject: PersonalProject[]
  PrivateProject: PrivateProject[]
}

export enum ProjectType {
  Private = 'private',
  Personal = 'personal'
}

export interface CreateProjectData extends Omit<Project, 'id'> {
  type: ProjectType,
  personalProject?: Omit<PersonalProject, 'id' | 'idProject'>,
  privateProject?: Omit<PrivateProject, 'id' | 'idProject'>
}

export interface UpdateProjectData extends Project {
  personalProject?: PersonalProject,
  privateProject?: PrivateProject
}

export type CreatePersonalProject =  Omit<PersonalProject, 'id'> 

export type CreatePrivateProject =  Omit<PrivateProject, 'id'> 