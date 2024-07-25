import express from 'express'

import { getTecnologies, getTecnology, createTecnology } from '../services/tecnologyService'

import { AuthMiddleware } from '../middleware/auth'

const router = express.Router()

// Retrieves ALL tecnologies
router.get('/', getTecnologies)

// Retrieves one tecnology
router.get('/:id', getTecnology)

// Adds a tecnology
router.post('/', AuthMiddleware, createTecnology)

export default router
