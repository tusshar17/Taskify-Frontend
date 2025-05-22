import React from 'react'
import clsx from 'clsx'

const baseStyles = 'flex flex-row item-center justify-center'

const sizeStyle = {
    sm: 'px-3 py-1 text-sm rounded-md',
    md: 'px-4 py-2 text-base rounded-lg',
    lg: 'px-6 py-3 text-lg rounded-xl',
}

const variantStyles = {
    primary: 'bg-gray-900 text-white hover:bg-gray-950',
    secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300',
    outline: 'border border-gray-400 text-gray-800 hover:bg-gray-200',
}

const Button = ({label, variant='primary', size='md', icon, iconPosition, className, ...props}) => {
  return (
    <button className={clsx(baseStyles, sizeStyle[size], variantStyles[variant], className)} {...props}>
        {icon && iconPosition === 'left' && (<span className="mr-2">{icon}</span>)}
        {label}
        {icon && iconPosition === 'right' && (<span className="ml-2">{icon}</span>)}
    </button>
  )
}

export default Button