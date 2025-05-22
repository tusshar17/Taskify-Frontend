import React from 'react'
import Button from './Button'
import { ArrowRight, Pencil, Trash2 } from 'lucide-react'
import { useNavigate } from 'react-router-dom'


const UserCard = ({user, onEdit, onDelete}) => {

  return (
    <div className='bg-gray-100 w-1/4 h-56 px-8 py-4 flex flex-col items-center justify-between rounded-xl'>
        <h2 className='w-full text-xl font-semibold'>{user.name}</h2>
        <div className='w-full flex flex-col gap-1'>
          <h4 className='text-sm font-medium text-gray-600'>Created on {user.created_at}</h4>
          <h4 className='text-sm font-medium text-gray-600'>Last Updated on {user.updated_at}</h4>
        </div>
        <div className='flex flex-row w-full items-center justify-between'>
          <Button label={""} icon={<Trash2/>} iconPosition={"left"} variant='outline' onClick={onDelete}/>
          <Button label={"Edit"} icon={<Pencil/>} iconPosition={"left"} variant='outline' onClick={onEdit}/>
        </div>
    </div>
  )
}

export default UserCard