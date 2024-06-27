import { ProjectEntry } from '../types';
import projectData from './projects.json';

const diaries: Array<ProjectEntry> = projectData as Array<ProjectEntry>;

export const getProjects = () => diaries;

export const addProject = () => {

}