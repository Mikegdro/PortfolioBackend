import { Request, Response } from 'express'

import { CreatePersonalProject, CreateProjectData, ProjectJoined, ProjectType } from '../types'

import * as ProjectModel from '../models/projects'

/**
 *  Retrieves the entire length of projects with its children.
 * 
 *  @param req 
 *  @param res 
 */
export const getProjects = async (req: Request, res: Response) => {
  try {
    const data: ProjectJoined[] = await ProjectModel.retrieveAllProjects()
    res.json(data)
  } catch (err) {
    console.log(err)
    res.status(500).send('Algo ha ocurrido mal, inténtelo de nuevo más tarde')
  }
}

/**
 *  Retrieves a project by its UUID field
 *  @param req 
 *  @param res 
 */
export const getProjectById = async (req: Request, res: Response) => {
  try {

    if (!req.params.id) {
      throw new Error('No se ha proporcionado un id')
    }

    const data = await ProjectModel.findById(req.params.id)

    if (data != null) {
      res.json(data);
    }

    res.sendStatus(404).send('No se ha encontrado dicho registro')
    
  } catch (err) {
    res.status(500).send('Ha ocurrido un error, inténtelo de nuevo más tarde')
  }
}

/**
 *  Creates a project with its children, weather Personal or Private.
 * 
 *  @param req 
 *  @param res 
 */
export const createProjectWithChildren = async (req: Request, res: Response) => {

  const project: CreateProjectData = req.body;

  // Project name check
  if (!project.name) {
    res.status(400).send('Especifíque un nombre de proyecto')
  }

  // Project type check
  if (!Object.values(ProjectType).includes(project.type)) {
    res.status(400).send('Especifique el tipo de proyecto')
  }

  try {
    const data = await ProjectModel.createProject({ name: req.body.name })
    
    if (project.type === 'personal') {
      const personalProject = await createPersonalProject({
        title: project.name,
        idProject: data[0].id,
        image: project.personalProject?.image ?? null,
        imageReduced: project.personalProject?.imageReduced ?? null,
        repository: project.personalProject?.repository ?? null,
      })
      
      res.status(201).json({
        project: data,
        personalProject: personalProject
      })
    }

    if (project.type === 'private') {

    }

  } catch (err) {
    res.status(500).send('Ha ocurrido un problema, inténtelo de nuevo más tarde.')
  }
}

/**
 *  Creates a project without children, just the project.
 * 
 *  @param req 
 *  @param res 
 */
export const createProjectWithoutChildren = async (req: Request, res: Response) => {

  const { name } = req.body;

  if (!name) {
    res.status(400).send('Especifique un nombre de proyecto.')
  }

  try {
    const data = await createProject(name)
    res.json(data)
  } catch (err) {
    res.status(500).send('Ha ocurrido un problema, intentelo de nuevo más tarde.')
  }

}

/**
 *  Creates a project.
 * 
 *  @param name 
 *  @returns 
 */
const createProject = async (name: string) => {
  return await ProjectModel.createProject({ name: name })
}

/**
 *  Creates a Personal Project.
 * 
 *  @param project 
 *  @returns 
 */
const createPersonalProject = async (project: CreatePersonalProject) => {
  return await ProjectModel.createPersonalProject(project)
}
