import { pgTable, uuid, varchar, integer } from "drizzle-orm/pg-core";
import { eq } from "drizzle-orm";

import { Response, Request } from "express";

import { db } from "../db";

import { Project } from "../db/schema";

export type Project = typeof Project.$inferSelect

const retrieveAllProjects = async(): Promise<any> => {

    try {
        const projects = await db.select().from(Project)
        
        return projects
    } catch (error) {
        console.log('what')
    }

}

export default retrieveAllProjects