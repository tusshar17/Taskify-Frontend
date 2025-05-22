import React, { useEffect, useState } from 'react'
import Button from '../../ui/Button'
import { CheckIcon, XIcon } from 'lucide-react'
import {createProject, updateProject} from '../../../api/projects'

const ProjectModal = ({isOpen, onClose, onSave, projectToEdit, showToast}) => {

    const [name, setName] = useState('')
    const [validationError, setValidationError] = useState(null)

    useEffect(()=>{
        if (projectToEdit) {
            setName(projectToEdit.name)
        } else {
            setName('')
        }
    }, [projectToEdit])

    useEffect(()=>{
        if (name.length > 1) {
            setValidationError(null)
        } else {
            setValidationError("Please enter a valid project name.")
        }
    }, [name])

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!name.trim()) {
            setValidationError("Please enter a valid project name.")
            return
        }
        const project = {name}
        if (!projectToEdit){
            try{
                const createResponse = await createProject(project)
                console.log(createResponse);
                showToast(createResponse.data.message)
                onSave()
            } catch (err) {
                console.log(err?.message)
                showToast(err?.message)
                onSave()
            }
            
        } else if(projectToEdit) {
            try{
                const udpateResponse = await updateProject(projectToEdit.id, project)
                showToast(udpateResponse.data.message)
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
          {projectToEdit ? 'Edit Project' : 'Add Project'}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            className="w-full p-2 border rounded"
            placeholder='Name'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          {validationError && <p className='text-red-400'>{validationError}</p>}

          <div className='flex justify-end gap-2'>
            <Button label={'cancel'} variant='outline' icon={<XIcon/>} iconPosition={'left'} onClick={onClose}/>
            <Button label={projectToEdit? 'Update' : 'Create'} icon={<CheckIcon/>} iconPosition={'left'} type='submit' onClick={handleSubmit}/>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ProjectModal