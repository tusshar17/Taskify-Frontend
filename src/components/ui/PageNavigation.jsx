import React, { useState } from 'react'
import Button from './Button'
import { ArrowRightIcon, ArrowLeftIcon } from 'lucide-react'

const PageNavigation = ({current_page, total_page, increment_page, decrement_page, section_title, onSortChange}) => {

  const [sortBy, setSortBy] = useState('updated_at')

  const handleSortChange = (e) => {
    const value = e.target.value
    setSortBy(value)
    onSortChange(value)
  }

  return (
    <div className='flex flex-row items-center justify-between w-full'>
      <h1 className='text-2xl font-bold'>{section_title}</h1>
      <div className='flex flex-row gap-2 items-center justify-center'>
        <label className='text-md font-normal'>Sort By:</label>
        <select value={sortBy} onChange={handleSortChange} className='px-4 py-2 rounded-md'>
          <option value={'name'}>Name</option>
          <option value={'updated_at'}>Date Updated</option>
          <option value={'created_at'}>Date Created</option>
        </select>
      </div>
      <div className='flex flex-row gap-2 items-center justify-center'>
          <h3 className='text-md font-normal'>Page {current_page} of {total_page}</h3>
          <Button icon={<ArrowLeftIcon/>} iconPosition={"left"} size='sm' variant='secondary' onClick={()=>(decrement_page())} disabled={current_page===1}/>
          <Button icon={<ArrowRightIcon/>} iconPosition={"left"} size='sm' variant='secondary' onClick={()=>(increment_page())} disabled={current_page===total_page}/>
      </div>
    </div>
  )
}

export default PageNavigation