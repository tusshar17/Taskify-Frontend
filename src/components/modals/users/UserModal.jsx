import React, { useEffect, useState } from 'react'
import Button from '../../ui/Button'
import { CheckIcon, XIcon } from 'lucide-react'
import { createUser, updateUser } from '../../../api/users'

const UserModal = ({isOpen, onClose, onSave, userToEdit, showToast}) => {

    const [name, setName] = useState('')
    const [validationError, setValidationError] = useState(null)

    useEffect(()=>{
        if (userToEdit) {
            setName(userToEdit.name)
        } else {
            setName('')
        }
    }, [userToEdit])

    useEffect(()=>{
        if (name.length > 1) {
            setValidationError(null)
        } else {
            setValidationError("Please enter a valid user name.")
        }
    }, [name])

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!name.trim()) {
            setValidationError("Please enter a valid user name.")
            return
        }
        const user = {name}
        if (!userToEdit){
            try{
                const createResponse = await createUser(user)
                console.log(createResponse);
                showToast(createResponse.data.message)
                onSave()
            } catch (err) {
                console.log(err?.message)
                showToast(err?.message)
                onSave()
            }
            
        } else if(userToEdit) {
            try{
                const udpateResponse = await updateUser(userToEdit.id, user)
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
          {userToEdit ? 'Edit User' : 'Add User'}
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
            <Button label={userToEdit? 'Update' : 'Create'} icon={<CheckIcon/>} iconPosition={'left'} type='submit' onClick={handleSubmit}/>
          </div>
        </form>
      </div>
    </div>
  )
}

export default UserModal