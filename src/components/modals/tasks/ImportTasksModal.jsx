import React, { useEffect, useState } from 'react'
import Button from '../../ui/Button'
import { CheckIcon, Trash2, XIcon } from 'lucide-react'
import { createTask, deleteTask, importTasks, updateTask } from '../../../api/tasks'
import convert_date from '../../../utils/date_converter'
import { getUsers } from '../../../api/users'

const ImportTaskModal = ({isOpen, onClose, onSave, taskToEdit, showToast, project_id}) => {
    
    const [validationError, setValidationError] = useState(null)
    const [file, setFile] = useState(null)

    const handleFileChange = async (e) => {
        const selectedFile = e.target.files[0]
        console.log(selectedFile);
        const allowedTypes = ['application/vnd.ms-excel','application/vnd.openxmlformats-officedocument.spreadsheetml.sheet']
        if (selectedFile && !allowedTypes.includes(selectedFile.type)) {
            setValidationError('Only .xls or .xlsx type file is allowed')
            return;
        }
        
        if (!selectedFile) {
            setValidationError('Please select a file')
        }

        setFile(selectedFile)
        
    }

    const handleSubmit = async (e) => {
        
        if (!file) {
            setValidationError('Please select a file')
        }
        
        const formData = new FormData()
        formData.append('file', file)

        try {
            const uploadResponse = await importTasks(project_id, formData)
            console.log(uploadResponse);
            const taskUploadReport = uploadResponse?.data?.task_upload_summary
            showToast(`${taskUploadReport?.created_successfully} tasks created successfully and ${taskUploadReport?.failed_to_create} failed.`)
            onSave()
        } catch (err) {
            console.log(err);
        }
    }

    if (!isOpen) return null

  return (
    <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50'>
        <div className='bg-white p-6 rounded-xl shadow-md w-full max-w-md'>
            <h2 className='text-xl font-semibold mb-4'>
            {taskToEdit ? 'Edit Task' : 'Add Task'}
            </h2>

            <div className="space-y-4 flex flex-col gap-4">
                <input
                    type='file'
                    accept='.xls, .xlsx'
                    className="w-full p-2 border rounded"
                    placeholder='Name'
                    onChange={handleFileChange}
                />

                

                {validationError && <p className='text-red-400'>{validationError}</p>}

                <div className='flex justify-evenly gap-2'>
                    <Button label={'cancel'} variant='outline' icon={<XIcon/>} iconPosition={'left'} onClick={onClose}/>
                    <Button label={taskToEdit? 'Update' : 'Create'} icon={<CheckIcon/>} iconPosition={'left'} type='submit' onClick={()=>{handleSubmit()}}/>
                </div>
            </div>
        </div>
    </div>
  )
}

export default ImportTaskModal