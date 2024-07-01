import { db } from '../db'

import { eq } from 'drizzle-orm'

import { PersonalProject, PrivateProject, Project } from '../db/schema'

import crypto from 'crypto'
import { CreatePersonalProject, CreatePrivateProject } from '../types'

/**
 *  Retrieves all the projects from the DB with joins.
 * 
 *  Uses Drizzle's API
 *  
 */
export const retrieveAllProjects = async () => {
  return await db.query.Project.findMany({
    with: {
      PrivateProject: true,
      PersonalProject: true
    }
  })
}

/**
 *  Retrieves a distinct Project filtering through UUID.
 * 
 *  @param idToFind  
 */
export const findById = async (idToFind: any) => {
  return await db.select().from(Project).where(eq(Project.id, idToFind))
}

/**
 *  Creates an standalone project
 * 
 *  @param project 
 */
export const createProject = async (project: { name: string }) => {
  return await db.insert(Project).values({ id: crypto.randomUUID(), name: project.name }).returning()
}

/**
 *  Creates a personal project.
 * 
 *  @param project 
 */
export const createPersonalProject = async (project: CreatePersonalProject) => {
  return await db.insert(PersonalProject).values({
    id: crypto.randomUUID(),
    idProject: project.idProject,
    title: project.title,
    repository: project.repository,
    image: project.image,
    imageReduced: project.imageReduced
  }).returning()
}

export const createPrivateProject = async (project: CreatePrivateProject) => {
  return await db.insert(PrivateProject).values({
    id: crypto.randomUUID(),
    idProject: project.idProject,
    title: project.title,
    companyId: project.companyId,
    startDate: project.startDate,
    endDate: project.endDate
  }).returning()
}

