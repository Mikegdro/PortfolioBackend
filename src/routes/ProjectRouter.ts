import express from 'express'

import { getProjects, createProjectWithChildren, getProjectById } from '../services/projectService'

import { AuthMiddleware } from '../middleware/auth'

const router = express.Router()

// Retrieves ALL projects
router.get('/', getProjects)

// Retrieves one project
router.get('/:id', getProjectById)

// Adds a project
router.post('/', AuthMiddleware, createProjectWithChildren)

export default router
