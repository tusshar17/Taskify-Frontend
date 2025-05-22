import React, { useEffect } from 'react'

const Toast = ({message, duration=3000, onclose}) => {
    
    useEffect(()=> {
        const timer = setTimeout(() => {
            onclose()
        }, duration);

        return () => clearTimeout(timer)
    }, [duration, onclose])

  return (
    <div className={`w-auto h-auto px-12 py-4 bg-gray-200 border-gray-950 border-l-8 fixed bottom-12 right-5 rounded-sm z-50`}>
        <p className='text-lg font-medium'>{message}</p>
    </div>
  )
}

export default Toast