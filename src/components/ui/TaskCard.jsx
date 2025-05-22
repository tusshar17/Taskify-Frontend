import React from 'react'
import Button from './Button'
import { ArrowRight, Pencil, Trash2 } from 'lucide-react'
import { useNavigate } from 'react-router-dom'


const TaskCard = ({task, onEdit, onDelete, handleClick}) => {

  const taskStatusColor =  task.status==='Completed' ? 'bg-green-200' : task.status==='In Progress' ? 'bg-blue-200' : 'bg-red-200'

  return (
    <tr key={task.id} className='bg-gray-100 border-b-8 border-white hover:bg-gray-200 cursor-pointer' onClick={()=>{handleClick()}}>
        <td className='py-2 px-4 text-left'>{task.name.slice(0, 20)}</td>
        <td className='py-2 px-4'><p className={`px-2 py-1 rounded-lg ${taskStatusColor}`}>{task.status}</p></td>
        <td className='py-2 px-4'><p className='px-2 py-1'>{task.description?.slice(0, 20)}</p></td>
        <td className='py-2 px-4'><p className='px-2 py-1'>{task.due_date}</p></td>
        <td className='py-2 px-4'><p className='px-2 py-1'>{task.users.map(user=>(user.user_name)).join(', ')}</p></td>
        <td className='py-2 px-4'><p className='px-2 py-1'>{task.updated_at}</p></td>
        <td className='py-2 px-4'><p className='px-2 py-1'>{task.created_at}</p></td>
    </tr>
  )
}

export default TaskCard