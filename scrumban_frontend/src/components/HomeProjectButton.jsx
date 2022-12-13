import React from 'react'
import { Link } from 'react-router-dom'

const ProjectButton = ({title, id, color}) => {
  return (
    <Link to={`/project/${id}`} className='h-fit'>
        <button className={`transition ease-out rounded h-[150px] w-[200px] bg-[${color}] bg-opacity-[0.2] hover:bg-indigo-600 hover:bg-opacity-[0.5] font-bold p-1`}>{title}</button>        
    </Link>
  )
}

export default ProjectButton