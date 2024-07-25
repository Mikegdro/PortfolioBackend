import { Request, Response } from 'express'

import * as TecnologyModel from '../models/tecnologyModel'

import { createTransaction } from '../db'
import { PostgresJsDatabase } from 'drizzle-orm/postgres-js'
import { validateUUID } from '../utils'

/**
 *  Retrieves the entire length of projects with its children.
 *
 *  @param req
 *  @param res
 */
export const getTecnologies = async (req: Request, res: Response) => {
  try {
    const data = await TecnologyModel.retrieveAllTecnologies()
    res.json(data)
  } catch (err) {
    console.log(err)
    res.status(500).send('Algo ha ocurrido mal, inténtelo de nuevo más tarde')
  }
}

/**
 *  Retrieves a single tecnology.
 *
 *  @param req
 *  @param res
 */
export const getTecnology = async (req: Request, res: Response) => {
  try {
    if (!req.params.id) {
      res.status(400).send('No se ha invado ningún id')
    }

    if (!validateUUID(req.params.id)) {
      res.status(400).send('El UUID no es válido')
    }

    const data = await TecnologyModel.retrieveTecnology(req.params.id)
    res.json(data)
  } catch (err) {
    console.log(err)
    res.status(500).send('Algo ha ocurrido mal, inténtelo de nuevo más tarde')
  }
}

export const createTecnology = async (req: Request, res: Response) => {
  
}
