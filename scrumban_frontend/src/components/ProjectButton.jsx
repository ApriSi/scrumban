import React from 'react'
import { Link } from 'react-router-dom'

const ProjectButton = ({title, id}) => {
  return (
    <Link to={`/project/${id}`} className='h-fit'>
        <button className='rounded bg-indigo-500 hover:bg-indigo-600 font-bold p-1 w-full'>{title}</button>
    </Link>
  )
}

export default ProjectButton