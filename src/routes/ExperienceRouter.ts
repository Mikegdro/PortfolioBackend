import express from 'express'
import * as experienceService from '../services/ExperienceService'

import { AuthMiddleware } from '../middleware/auth'

const router = express.Router()

// Retrieves ALL projects
router.get('/', experienceService.getExperiences)

// Retrieves one experience
router.get("/:id", experienceService.getExperience);

// Adds an exprience
router.post("/", AuthMiddleware, experienceService.createExperience);

export default router
