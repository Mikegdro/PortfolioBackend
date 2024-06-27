import { ProjectEntry } from '../types'
import projectData from './projects.json'

const diaries: ProjectEntry[] = projectData as ProjectEntry[]

export const getProjects = () => diaries

export const addProject = () => {

}
