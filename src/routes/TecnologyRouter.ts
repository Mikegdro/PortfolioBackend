import express from 'express'
import * as projectService from '../services/ProjectService'
import * as tecnologyService from '../services/TecnologyService'

import { AuthMiddleware } from '../middleware/auth'

const router = express.Router()

// Retrieves ALL tecnologies
router.get('/', tecnologyService.getTecnologies)

// Retrieves one tecnology
router.get('/:id', tecnologyService.getTecnology)

// Adds a tecnology
router.post('/', AuthMiddleware, projectService.createProjectWithChildren)

export default router
