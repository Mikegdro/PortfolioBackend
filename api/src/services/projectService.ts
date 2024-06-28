import { NewProjectEntry, NonSensitiveProjectEntry, ProjectEntry } from '../types'
import projectData from './projects.json'

import { Request, Response } from 'express'

import retrieveAllProjects from '../models/projects'

// Data recovery
const projects: ProjectEntry[] = projectData as ProjectEntry[]

// Retreives all the projects raw, without altering anything
export const getProjects = (): ProjectEntry[] => {
  const data = retrieveAllProjects()
  return projects
}

// Retrieves all the projects stripping them all from the comment
export const getProjectsWithoutSensitiveInfo = (): NonSensitiveProjectEntry[] => {
  
  const filteredprojects: NonSensitiveProjectEntry[] = projects.map(({ id, date, weather, visibility }) => {
    return {
      id, date, weather, visibility
    }
  })

  return filteredprojects
}

// Finds by ID the project and strips the comment to make it NonSensitive
export const findById = (idToFind: number): NonSensitiveProjectEntry | undefined => {
  const entry = projects.find(entry => entry.id === idToFind)

  if (entry != null) {
    const { comment, ...restOfProject } = entry
    return restOfProject
  }

  return undefined
}

// Adds a project
export const addProject = (newProjectData: NewProjectEntry): ProjectEntry => {

    const newProject: ProjectEntry = {
        id: projects.length + 1,
        ...newProjectData
    }

    projects.push(newProject)

    return newProject
}
