import React from 'react'
import Button from './Button'
import { ArrowRightIcon, ArrowLeftIcon } from 'lucide-react'

const PageNavigation = ({current_page, total_page, increment_page, decrement_page, section_title}) => {
  return (
    <div className='flex flex-row items-center justify-between w-full'>
      <h1 className='text-2xl font-bold'>{section_title}</h1>
      <div className='flex flex-row gap-2 items-center justify-center'>
          <h3 className='text-md font-normal'>Page {current_page} of {total_page}</h3>
          <Button icon={<ArrowLeftIcon/>} iconPosition={"left"} size='sm' variant='secondary' onClick={()=>(decrement_page())} disabled={current_page===1}/>
          <Button icon={<ArrowRightIcon/>} iconPosition={"left"} size='sm' variant='secondary' onClick={()=>(increment_page())} disabled={current_page===total_page}/>
      </div>
    </div>
  )
}

export default PageNavigation