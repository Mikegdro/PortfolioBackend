import { Request, Response } from 'express'

import * as ProjectModel from '../models/projectModel'

import { createTransaction } from '../db'

/**
 *  Retrieves the entire length of projects with its children.
 *
 *  @param req
 *  @param res
 */
export const getProjects = async (req: Request, res: Response) => {
  try {
    const data = await ProjectModel.retrieveAllProjects()
    res.json(data)
  } catch (err) {
    console.log(err)
    res.status(500).send('Algo ha ocurrido mal, inténtelo de nuevo más tarde')
  }
}

/**
 *  Retrieves a project by its UUID field.
 *
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
      res.json(data)
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
  // Try-catch for Error processing
  try {
    res.status(202).send('Project created successfully')
  } catch (err) {
    handleError(res, err)
  }
}

/**
 *  Creates a project without children, just the project.
 *
 *  @param req
 *  @param res
 */
export const createProjectWithoutChildren = async (req: Request, res: Response) => {
  const { name } = req.body

  if (!name) {
    res.status(400).send('Especifique un nombre de proyecto.')
  }

  try {
    const data = await ProjectModel.createProject(name)
    res.json(data)
  } catch (err) {
    res.status(500).send('Ha ocurrido un problema, intentelo de nuevo más tarde.')
  }
}

/**
 *  Function to type check the err, and respond acordingly to the client.
 *
 *  @param res
 *  @param err
 */
const handleError = (res: Response, err: unknown) => {
  let errMessage = 'Ha ocurrido un problema, inténtelo de nuevo más tarde'

  if (typeof err === 'string') {
    errMessage = err
  } else if (err instanceof Error) {
    errMessage = err.message
  }

  res.status(500).send(errMessage)
}

/**
 *  This function manages the creation of a personal project, using the transaction object provided by drizzle,
 *  and passing it to the through params to ensure the correct creation of both tables.
 *
 *  @param req HTTP request through Express
 *  @param res HTTP response
 */
const createPersonalProject = async (req: Request, res: Response) => {
  const project = req.body

  // This operations are made using a transaction to ensure that if one of them fails, both are rolled back
  const result = await createTransaction(async (trx) => {
    // Creates the main project
    const data = await ProjectModel.createProject({ name: req.body.name }, trx)

    // Creates the personal project
    const personalProject = await ProjectModel.createPersonalProject({
      title: project.name ?? 'Titulo temporal',
      idProject: data[0].id,
      image: project.personalProject?.image ?? null,
      imageReduced: project.personalProject?.imageReduced ?? null,
      repository: project.personalProject?.repository ?? null
    }, trx)

    return { data, personalProject }
  })

  res.status(201).json(result)
}

/**
 *  This function manages the creation of a private project, using the transaction object provided by drizzle,
 *  and passing it to the through params to ensure the correct creation of both tables.
 *
 *  @param req HTTP request through Express
 *  @param res HTTP response
 */
const createPrivateProject = async (req: Request, res: Response) => {
  const project = req.body

  // This operations are made using a transaction to ensure that if one of them fails, both are rolled back
  const result = await createTransaction(async (trx) => {
    // Creates the main project
    const data = await ProjectModel.createProject({ name: req.body.name }, trx)

    // Creates the personal project
    const privateProject = await ProjectModel.createPrivateProject({
      title: project.name ?? 'Titulo temporal',
      idProject: data[0].id,
      companyId: project.privateProject?.companyId ?? null,
      startDate: '',
      endDate: ''
    }, trx)

    return { data, privateProject }
  })

  res.status(201).json(result)
}
