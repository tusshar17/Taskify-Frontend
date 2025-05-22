import React, { useEffect, useState } from 'react'
import Button from '../../ui/Button'
import { CheckIcon, Trash2, XIcon } from 'lucide-react'
import { createTask, deleteTask, updateTask } from '../../../api/tasks'
import convert_date from '../../../utils/date_converter'
import { getUsers } from '../../../api/users'

const TaskModal = ({isOpen, onClose, onSave, taskToEdit, showToast, project_id}) => {

    const [name, setName] = useState('')
    const [status, setStatus] = useState('')
    const [description, setDescription] = useState('')
    const [dueDate, setDueDate] = useState('')
    const [users, setUsers] = useState([])

    const [validationError, setValidationError] = useState(null)

    const [allUsers, setAllUsers] = useState([])

    const fetchAllUsers = async () => {
            try{
            const res = await getUsers(1, 100)
            setAllUsers(res?.data?.users)        
            } catch (err) {
                
            }
        }

    useEffect(()=>{
        fetchAllUsers()
        
        if (taskToEdit) {
            setName(taskToEdit.name)
            setStatus((taskToEdit.status.replaceAll(' ', '_')).toUpperCase())
            setDescription(taskToEdit.description)
            setDueDate(convert_date(taskToEdit.due_date))
            setUsers(taskToEdit.users.map((user)=>(user.user_id)))
        } else {
            setName('')
            setStatus('')
            setDescription('')
            setDueDate('')
            setUsers([])
        }
    }, [taskToEdit])

    const handleUserCheckBox = (e, user_choice_id) => {
        if (e.target.checked) {
            setUsers([...users, user_choice_id]);
        } else {
            setUsers(users.filter((user)=>(user!==user_choice_id)))
        }
    }


    const handleDelete = async (e) => {
        e.preventDefault()
        try {
            const deleteResponse = await deleteTask(project_id, taskToEdit.id)
            console.log(deleteResponse);
            showToast(deleteResponse?.data?.message)
            onSave()
        } catch (err) {
            showToast(err?.message)
            onSave()
        }
    }


    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!name.trim() || !status || !dueDate) {
            setValidationError("Please enter valid task details.")
            return
        }
        const task = {
            name: name,
            description: description,
            status: status,
            due_date: dueDate,
            user_ids: users
        }
        if (!taskToEdit){
            try {
                const createResponse = await createTask(project_id, task)
                console.log("Here", createResponse);
                showToast(createResponse?.data?.message)
                onSave()
            } catch (err) {
                console.log("Catch", err)
                showToast(err?.message)
                onSave()
            }
            
        } else if(taskToEdit) {
            try {
                const udpateResponse = await updateTask(project_id, taskToEdit.id, task)
                showToast(udpateResponse?.data?.message)
                console.log(udpateResponse)
                onSave()
            } catch (err) {
                showToast(err?.message)
                onSave()
            }
            
        }
        
    }

    if (!isOpen) return null

  return (
    <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50'>
        <div className='bg-white p-6 rounded-xl shadow-md w-full max-w-md'>
        <h2 className='text-xl font-semibold mb-4'>
          {taskToEdit ? 'Edit Task' : 'Add Task'}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4 flex flex-col gap-4">
          <input
            type='text'
            className="w-full p-2 border rounded"
            placeholder='Name'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            type='text'
            className="w-full p-2 border rounded"
            placeholder='Description'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <div className='flex flex-row gap-4'>
            <label className='flex flex-row gap-2'>
                <input
                type="radio"
                value="IN_PROGRESS"
                checked={status === 'IN_PROGRESS'}
                onChange={(e) => setStatus(e.target.value)}
                />
                In Progress
            </label>
            <label className='flex flex-row gap-2'>
                <input
                type="radio"
                value="NOT_STARTED"
                checked={status === 'NOT_STARTED'}
                onChange={(e) => setStatus(e.target.value)}
            />
                Not Started
            </label>
            <label className='flex flex-row gap-2'>
                <input
                type="radio"
                value="COMPLETED"
                checked={status === 'COMPLETED'}
                onChange={(e) => setStatus(e.target.value)}
            />
                Completed
            </label>
          </div>

          <label>
            Due Date
          <input
            type='date'
            className="w-full p-2 border rounded"
            placeholder='Due Date'
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
          </label>

          <div className='flex flex-col gap-2'>
            Assign to
            <div className='flex flex-col max-h-[10vh] overflow-y-scroll'>
                {allUsers.map((user_choice)=>(
                    <label className='flex flex-row gap-2' key={user_choice.id}>
                    <input key={user_choice.id} type='checkbox' checked={users.includes(user_choice.id)} onChange={(e)=>{handleUserCheckBox(e, user_choice.id)}}/>
                    {user_choice.name} {user_choice.id}
                    </label>
                    ))}
            </div>
          </div>

          {validationError && <p className='text-red-400'>{validationError}</p>}

          <div className='flex justify-evenly gap-2'>
            <Button label={'Delete'} variant='primary' className={'bg-red-500 hover:bg-red-700'} icon={<Trash2/>} iconPosition={'left'} onClick={(e)=>handleDelete(e)}/>
            <Button label={'cancel'} variant='outline' icon={<XIcon/>} iconPosition={'left'} onClick={onClose}/>
            <Button label={taskToEdit? 'Update' : 'Create'} icon={<CheckIcon/>} iconPosition={'left'} type='submit' onClick={handleSubmit}/>
          </div>
        </form>
      </div>
    </div>
  )
}

export default TaskModal