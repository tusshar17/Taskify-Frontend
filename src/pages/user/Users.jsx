import React, { useEffect, useState } from 'react'
import { getUsers } from '../../api/users'
import PageNavigation from '../../components/ui/PageNavigation'
import UserCard from '../../components/ui/UserCard'
import Button from '../../components/ui/Button'
import { PlusIcon } from 'lucide-react'
import Toast from '../../components/ui/Toast'
import UserModal from '../../components/modals/users/UserModal'
import DeleteModal from '../../components/modals/users/UserDeleteModal'


const Users = () => {

  const [usersRes, setUsersRes] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
  
    const [page, setPage] = useState(1)
    const [total, setTotal] = useState(0)
    const limit = 6
  
    const [activeModal, setActiveModal] = useState(null) // 'add' or 'edit' or 'delete' or null
    const [selectedUser, setSelectedUser] = useState(null)
  
    const [toast, setToast] = useState(null)
  
    const showToast = (msg) => {
      setToast(msg)
    }

    useEffect(()=>{
        fetchUsers()
      }, [page])
    
      const fetchUsers = async () => {
        setLoading(true)
        setError(null)
        try{
          const res = await getUsers(page, limit)
          console.log(res)
          setUsersRes(res.data)
          setTotal(res.data.pages)
        } catch (err) {
          setError(err.message || 'Something went wrong while fetching users')
        } finally {
          setLoading(false)
        }
      }
    
      const decrement_page = () => (setPage(p => Math.max(p-1, 1)))
      const increment_page = () => (setPage(p => Math.min(p+1, total)))

  return (
    <div className='w-full flex flex-col flex-wrap gap-8 items-center justify-start mt-8 px-12'>
      <PageNavigation current_page={usersRes?.current_page} total_page={total} increment_page={increment_page} decrement_page={decrement_page}/>

      {loading && <p>Loading......</p>}

      {error && <p>{error}</p>}

      {!error && !loading && (
        <div className='w-full flex flex-row flex-wrap gap-4 items-center justify-start'>
        {usersRes?.users?.map((user, id)=>(<UserCard key={id} user={user} onEdit={()=>{setActiveModal('edit'); setSelectedUser(user)}} onDelete={()=>{setActiveModal('delete'); setSelectedUser(user)}}/>))}
      </div>
      )}

      <Button label={"Create New User"} icon={<PlusIcon/>} iconPosition={"left"} size='md' className={"fixed bottom-16"} onClick={()=>{setActiveModal('add'); setSelectedProject(null)}}/>

      {toast && (<Toast message={toast} type={"error"} onclose={()=>setToast(null)}/>)}

      {activeModal === 'add' && (
        <UserModal isOpen={true} onClose={()=>setActiveModal(null)} onSave={()=>{setActiveModal(null); fetchUsers()}} showToast={showToast}/>
      )}

      {activeModal === 'edit' && selectedUser && (
        <UserModal isOpen={true} userToEdit={selectedUser} onClose={()=>setActiveModal(null)} onSave={()=>{setActiveModal(null); fetchUsers()}} showToast={showToast}/>
      )}

      {activeModal === 'delete' && selectedUser && (
        <DeleteModal isOpen={true} userToDelete={selectedUser} onClose={()=>setActiveModal(null)} onSave={()=>{setActiveModal(null); fetchUsers()}} showToast={showToast}/>
      )}


    </div>
  )
}

export default Users