import express from 'express'
import { getProjects, addProject } from '../services/projectService'

const router = express.Router()

router.get('/', (req, res) => {
  const projects = getProjects()
  res.json(projects)
})

router.post('/', (req, res) => {
  res.send('Creating the diary entry')
})

export default router
