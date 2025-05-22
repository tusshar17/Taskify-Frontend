import axios from 'axios'
import {base_api} from './config'

const taskAPI = axios.create({
    baseURL: `${base_api}/project`
})

export const getTasks = (page=1, per_page=6, project_id) => taskAPI.get(`/${project_id}/task?page=${page}&per_page=${per_page}`)
export const createTask = (project_id, task) => taskAPI.post(`/${project_id}/task/`, task)
export const updateTask = (project_id, task_id, task) => taskAPI.put(`/${project_id}/task/${task_id}`, task)
export const deleteTask = (project_id, task_id) => taskAPI.delete(`/${project_id}/task/${task_id}`)

export const exportTasks = (project_id) => taskAPI.get(`/${project_id}/task/download`, {responseType: 'blob'})
export const importTasks = (project_id, formData) => taskAPI.post(`/${project_id}/task/upload`, formData, {headers:{'Content-Type': 'multipart/form-data'}})