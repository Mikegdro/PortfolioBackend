import express from 'express'

import { getExperiences, getExperience, createExperience } from '../services/ExperienceService'

import { AuthMiddleware } from '../middleware/auth'

const router = express.Router()

// Retrieves ALL projects
router.get('/', getExperiences)

// Retrieves one experience
router.get('/:id', getExperience)

// Adds an exprience
router.post('/', AuthMiddleware, createExperience)

export default router
