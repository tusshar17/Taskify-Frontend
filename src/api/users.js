import axios from 'axios'
import {base_api} from './config'

const userAPI = axios.create({
    baseURL: `${base_api}/user`
})

export const getUsers = (page=1, per_page=6, sort_by='updated_at') => userAPI.get(`/?page=${page}&per_page=${per_page}&sort_by=${sort_by}&order=asc`)
export const createUser = (user) => userAPI.post('/', user)
export const updateUser = (id, user) => userAPI.put(`/${id}`, user)
export const deleteUser = (id) => userAPI.delete(`/${id}`)
