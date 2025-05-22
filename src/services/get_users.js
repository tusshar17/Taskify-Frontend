import {getUsers} from '../api/users'

const get_users = async (page, limit) => {
    try{
        const res = await getUsers(page, limit)
        return res?.data?.users
    } catch (err) {
        return 
    }
}

export default get_users