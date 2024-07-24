import { db } from '../db'

import { eq } from 'drizzle-orm'

import { Experience } from '../db/schema'

/**
 *  Retrieves all the projects from the DB with joins.
 *
 *  Uses Drizzle's API
 *
 */
export const retrieveAllExperiences = async () => {
  return await db.query.Experience.findMany({
    with: {
      Company: true,
      PrivateProject: true
    }
  })
}

/**
 *  Retrieves a single experience.
 * 
 *  @param id 
 *  @returns 
 */
export const retrieveExperience = async (id: any) => {
  return await db.query.Experience.findFirst({where: eq(Experience.id, id)})
}
