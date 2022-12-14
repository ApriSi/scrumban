import React from 'react'
import { Link } from 'react-router-dom'

const ProjectButton = ({title, id, color}) => {
  return (
    <Link to={`/project/${id}`} className='h-fit'>
        <button className={`rounded bg-color${color} hover:bg-indigo-600/[0.8] font-bold p-1 w-full`}>{title}</button>
    </Link>
  )
}

export default ProjectButton