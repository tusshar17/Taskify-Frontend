import React from 'react'
import Button from './Button'
import { ArrowRight, Pencil, Trash2 } from 'lucide-react'
import { useNavigate } from 'react-router-dom'


const TaskCard = ({task, onEdit, onDelete, handleClick}) => {

  return (
    <tr key={task.id} className='bg-gray-100 my-4 hover:bg-gray-200 cursor-pointer' onClick={()=>{handleClick()}}>
        <td className='py-2 px-4 text-left'>{task.name.slice(0, 20)}</td>
        <td className='py-2 px-4'>{task.status}</td>
        <td className='py-2 px-4'>{task.description?.slice(0, 20)}</td>
        <td className='py-2 px-4'>{task.due_date}</td>
        <td className='py-2 px-4'>{task.users.map(user=>(user.user_name)).join(', ')}</td>
        <td className='py-2 px-4'>{task.updated_at}</td>
        <td className='py-2 px-4'>{task.created_at}</td>
    </tr>
  )
}

export default TaskCard