import axios from 'axios'
import {base_api} from './config'

const projectsAPI = axios.create({
    baseURL: `${base_api}/project`
})

export const getProjects = (page=1, per_page=6, sort_by='updated_at') => projectsAPI.get(`/?page=${page}&per_page=${per_page}&sort_by=${sort_by}&order=asc`)
export const getProjectById = (id) => projectsAPI.get(`/${id}`)
export const createProject = (project) => projectsAPI.post('/', project)
export const updateProject = (id, project) => projectsAPI.put(`/${id}`, project)
export const deleteProject = (id) => projectsAPI.delete(`/${id}`)
