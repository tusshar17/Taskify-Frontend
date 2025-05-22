import React, { useEffect, useState } from 'react'
import ProjectCard from '../../components/ui/ProjectCard'
import PageNavigation from '../../components/ui/PageNavigation'
import {getProjects} from '../../api/projects'
import Button from '../../components/ui/Button'
import { PlusIcon } from 'lucide-react'
import ProjectModal from '../../components/modals/projects/ProjectModal'
import Toast from '../../components/ui/Toast'
import ProjectDeleteModal from '../../components/modals/projects/ProjectDeleteModal'


const Home = () => {

  const [projectsRes, setProjectsRes] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const [page, setPage] = useState(1)
  const [total, setTotal] = useState(0)
  const [sortBy, setSortBy] = useState('updated_at')
  const limit = 6

  const [activeModal, setActiveModal] = useState(null) // 'add' or 'edit' or 'delete' or null
  const [selectedProject, setSelectedProject] = useState(null)

  const [toast, setToast] = useState(null)

  const showToast = (msg) => {
    setToast(msg)
  }

  useEffect(()=>{
    fetchProjects()
  }, [page, sortBy])

  const fetchProjects = async () => {
    setLoading(true)
    setError(null)
    try{
      const res = await getProjects(page, limit, sortBy)
      setProjectsRes(res.data)
      setTotal(res.data.pages)
    } catch (err) {
      setError(err.message || 'Something went wrong while fetching projects')
    } finally {
      setLoading(false)
    }
  }

  const decrement_page = () => (setPage(p => Math.max(p-1, 1)))
  const increment_page = () => (setPage(p => Math.min(p+1, total)))

  return (
    <div className='w-full flex flex-col flex-wrap gap-8 items-center justify-start mt-8 px-12'>
      <PageNavigation current_page={projectsRes?.current_page} total_page={total} increment_page={increment_page} decrement_page={decrement_page} section_title={"Projects"} onSortChange={setSortBy}/>

      {loading && <p>Loading......</p>}

      {error && <p>{error}</p>}

      {!error && !loading && (
        <div className='w-full flex flex-row flex-wrap gap-4 items-center justify-start'>
        {projectsRes?.projects?.map((project, id)=>(<ProjectCard key={id} project={project} onEdit={()=>{setActiveModal('edit'); setSelectedProject(project)}} onDelete={()=>{setActiveModal('delete'); setSelectedProject(project)}}/>))}
      </div>
      )}

      <Button label={"Create New Project"} icon={<PlusIcon/>} iconPosition={"left"} size='md' className={"fixed bottom-16"} onClick={()=>{setActiveModal('add'); setSelectedProject(null)}}/>

      {toast && (<Toast message={toast} type={"error"} onclose={()=>setToast(null)}/>)}

      {activeModal === 'add' && (
        <ProjectModal isOpen={true} onClose={()=>setActiveModal(null)} onSave={()=>{setActiveModal(null); fetchProjects()}} showToast={showToast}/>
      )}

      {activeModal === 'edit' && selectedProject && (
        <ProjectModal isOpen={true} projectToEdit={selectedProject} onClose={()=>setActiveModal(null)} onSave={()=>{setActiveModal(null); fetchProjects()}} showToast={showToast}/>
      )}

      {activeModal === 'delete' && selectedProject && (
        <ProjectDeleteModal isOpen={true} projectToDelete={selectedProject} onClose={()=>setActiveModal(null)} onSave={()=>{setActiveModal(null); fetchProjects()}} showToast={showToast}/>
      )}

    </div>
  )
}

export default Home