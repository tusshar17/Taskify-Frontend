import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import PageNavigation from '../../components/ui/PageNavigation'
import TaskCard from '../../components/ui/TaskCard'
import {exportTasks, getTasks} from "../../api/tasks"
import Button from '../../components/ui/Button'
import { FileDownIcon, FileInputIcon, PlusIcon } from 'lucide-react'
import Toast from '../../components/ui/Toast'
import TaskModal from '../../components/modals/tasks/TaskModal'
import { getProjectById } from '../../api/projects'
import ImportTaskModal from '../../components/modals/tasks/ImportTasksModal'

const Task = () => {
  const {project_id} = useParams()

  const [tasksRes, setTasksRes] = useState([])
  const [tasksLoading, setTasksLoading] = useState(false)
  const [taskError, setTaskError] = useState(null)

  const [project, setProject] = useState()

  const [page, setPage] = useState(1)
  const [total, setTotal] = useState(0)
  const limit = 10

  const [activeModal, setActiveModal] = useState(null) // 'add' or 'edit' or 'delete' or null
  const [selectedTask, setSelectedTask] = useState(null)

  const [toast, setToast] = useState(null)

  const showToast = (msg) => {
    setToast(msg)
  }

  useEffect(()=>{
    fetchTasks()
    fetchProjectById(project_id)
  }, [page])

  const fetchProjectById = async (project_id) => {
    try{
      const res = await getProjectById(project_id)
      setProject(res?.data)
    } catch (err) {

    }
  }

  const fetchTasks = async () => {
    setTasksLoading(true)
    setTaskError(null)
    try{
      const res = await getTasks(page, limit, project_id)
      console.log(res);
      setTasksRes(res.data)
      setTotal(res.data.pages)
    } catch (err) {
      setTaskError(err.message || 'Something went wrong while fetching tasks')
    } finally {
      setTasksLoading(false)
    }
  }

  const handleExportTasks = async (project_id) => {
    try {
      const res = await exportTasks(project_id)
      console.log(res)
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'filename.xls');
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url)
    } catch (err) {
      console.log(err)
    }
  }

  const decrement_page = () => (setPage(p => Math.max(p-1, 1)))
  const increment_page = () => (setPage(p => Math.min(p+1, total)))

  return (
    <div className='w-full flex flex-col flex-wrap gap-8 items-center justify-start mt-8 px-12'>
      <PageNavigation section_title={`Project: ${project?.name}`} current_page={tasksRes?.current_page} total_page={total} increment_page={increment_page} decrement_page={decrement_page}/>

      {tasksLoading && <p>Loading......</p>}

      {taskError && <p>{taskError}</p>}

      {!taskError && !tasksLoading && (
        <table className='w-full h-auto text-center gap-x-4'>
          <thead>
            <tr className='text-lg font-semibold'>
              <th className='py-2 px-4 text-left'>Name</th>
              <th className='py-2 px-4'>Status</th>
              <th className='py-2 px-4'>Description</th>
              <th className='py-2 px-4'>Due Date</th>
              <th className='py-2 px-4'>Assigned To</th>
              <th className='py-2 px-4'>Updated At</th>
              <th className='py-2 px-4'>Created At</th>
            </tr>
          </thead>
          <tbody className=''>
            {tasksRes?.tasks?.map((task, id)=>(<TaskCard key={id} task={task} handleClick={()=>{setActiveModal('edit'); setSelectedTask(task)}}/>))}
          </tbody>
        </table>
      )}

      <div className='fixed bottom-16 flex flex-row gap-8'>
      <Button label={"Create New Task"} icon={<PlusIcon/>} iconPosition={"left"} size='md' onClick={()=>{setActiveModal('add'); setSelectedTask(null)}}/>
      <Button label={"Export All Tasks"} icon={<FileDownIcon/>} iconPosition={"left"} size='md' variant='secondary' onClick={()=>{handleExportTasks(project_id)}}/>
      <Button label={"Import Tasks"} icon={<FileInputIcon/>} iconPosition={"left"} size='md' variant='secondary' onClick={()=>{setActiveModal('import')}}/>
      </div>

      {toast && (<Toast message={toast} type={"error"} onclose={()=>setToast(null)}/>)}

      {activeModal === 'add' && (
        <TaskModal project_id={project_id} isOpen={true} onClose={()=>setActiveModal(null)} onSave={()=>{setActiveModal(null); fetchTasks()}} showToast={showToast}/>
      )}

      {activeModal === 'edit' && selectedTask && (
        <TaskModal project_id={project_id} isOpen={true} taskToEdit={selectedTask} onClose={()=>setActiveModal(null)} onSave={()=>{setActiveModal(null); fetchTasks()}} showToast={showToast}/>
      )}

       {activeModal === 'import' && (
        <ImportTaskModal project_id={project_id} isOpen={true} onClose={()=>setActiveModal(null)} onSave={()=>{setActiveModal(null); fetchTasks()}} showToast={showToast}/>
      )}

    </div>
  )
}

export default Task