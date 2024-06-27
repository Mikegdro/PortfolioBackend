import express from 'express'
import * as projectService from '../services/projectService'

const router = express.Router()

// Retrieves ALL projects
router.get('/', (req, res) => {
  const projects = projectService.getProjectsWithoutSensitiveInfo()
  res.json(projects)
})

// Retrieves one project
router.get('/:id', (req, res) => {
  const project = projectService.findById(+req.params.id)

  return (project != null) ? res.json(project) : res.sendStatus(404)
})

// Adds a project
router.post('/', (req, res) => {
  const newProjectEntry = projectService.addProject(req.body)

  res.json(newProjectEntry)
})

export default router
