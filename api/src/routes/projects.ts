import express from 'express'
import * as projectService from '../services/projectService'
import toNewProjectEntry from '../utils'

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

  try {
    const newProjectEntry = toNewProjectEntry(req.body)
    const addedProjectEntry = projectService.addProject(newProjectEntry)

    res.send(addedProjectEntry)

  } catch(error) {

    

    console.log(typeof error)

    res.status(400).send(error)
  }
  
})

export default router
