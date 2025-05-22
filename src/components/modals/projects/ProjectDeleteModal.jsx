import { Trash2, XIcon } from 'lucide-react'
import React from 'react'
import {deleteProject} from '../../../api/projects'
import Button from '../../ui/Button'



const DeleteModal = ({isOpen, onClose, onSave, projectToDelete, showToast}) => {

    const handleDelete = async () => {
        try {
            const deleteResponse = await deleteProject(projectToDelete.id)
            showToast(deleteResponse?.data?.message)
            onSave()
        } catch (err) {
            showToast(err?.message)
            onSave()
        }
    }

    if (!isOpen){
        return
    }
        

  return (
    <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-65 z-50'>
        <div className='bg-white p-6 rounded-xl shadow-md w-full max-w-md'>
            <h2 className='text-lg font-semibold mb-8'>Do you want to delete project "{projectToDelete?.name}" ?</h2>
          <div className='flex justify-end gap-2'>
            <Button label={'cancel'} variant='outline' icon={<XIcon/>} iconPosition={'left'} onClick={onClose}/>
            <Button label={'Yes'} icon={<Trash2/>} iconPosition={'left'} type='submit' onClick={handleDelete} className={'bg-red-500 hover:bg-red-700'}/>
          </div>
      </div>
    </div>
  )
}

export default DeleteModal