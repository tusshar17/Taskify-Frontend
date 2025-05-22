import { UserIcon } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router-dom'
import Button from './ui/Button'

const TopNavigationBar = () => {
  return (
    <div className='bg-slate-950 w-full h-20 flex items-center justify-between px-8'>
      <Link to={"/"}>
        <h1 className='text-white font-extrabold text-3xl'>Taskify</h1>
      </Link>

      <Link to={"/users"}>
        <Button label={'Manage Users'} icon={<UserIcon/>} iconPosition={'left'} variant='secondary'/>
      </Link>
    </div>
  )
}

export default TopNavigationBar