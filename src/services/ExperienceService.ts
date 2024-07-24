import { Request, Response } from 'express'

import * as ExperienceModel from '../models/ExperienceModel'

import { createTransaction } from '../db'
import { PostgresJsDatabase } from 'drizzle-orm/postgres-js'
import { validateUUID } from '../utils'

/**
 *  Retrieves the entire length of experiences with its children.
 *
 *  @param req
 *  @param res
 */
export const getExperiences = async (req: Request, res: Response) => {
  try {
    const data = await ExperienceModel.retrieveAllExperiences()
    res.json(data)
  } catch (err) {
    console.log(err)
    res.status(500).send('Algo ha ocurrido mal, inténtelo de nuevo más tarde')
  }
}

/**
 *  Retrieves a single experience.
 * 
 *  @param req 
 *  @param res 
 */
export const getExperience = async (req: Request, res: Response) => {
  try {

    if (!req.params.id) {
      throw new Error('No se ha proporcionado un id')
    }

    if (!validateUUID(req.params.id)) {
      throw new Error('No se ha proporcionado un UUID válido')
    }
    
    const data = await ExperienceModel.retrieveExperience(req.params.id)
    res.status(200).send(data)
  } catch (err){
    console.log(err)
    res.status(500).send('Algo ha ocurrido mal, inténtelo de nuevo más tarde')
  }
}

/**
 *  Creates an experience.
 * 
 *  @param req 
 *  @param res 
 */
export const createExperience = async (req: Request, res: Response) => {
  try {

  } catch (err){
    console.log(err)
    res.status(500).send('Algo ha ocurrido mal, inténtelo de nuevo más tarde')
  }
}
