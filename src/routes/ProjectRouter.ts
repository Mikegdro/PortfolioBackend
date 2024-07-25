import express from 'express'

import { getProjects, getProjectById, createProjectWithChildren } from '../services/ProjectService'

import { AuthMiddleware } from '../middleware/auth'

const router = express.Router()

// Retrieves ALL projects
router.get('/', getProjects)

// Retrieves one project
router.get('/:id', getProjectById)

// Adds a project
router.post('/', AuthMiddleware, createProjectWithChildren)

export default router
