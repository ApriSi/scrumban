import React from 'react'
import { Link } from 'react-router-dom'

const ProjectButton = ({title, id, color}) => {
  return (
    <Link to={`/project/${id}`} className='h-fit'>
        <button className={`rounded bg-gray-800 hover:bg-indigo-600/[0.8] font-bold w-[100px] relative`}>
          <div className={`absolute bottom-0 w-[100%] h-[3px] bg-color${color} rounded`}/>
          <p className='p-1 truncate'>{title}</p>
        </button>
    </Link>
  )
}

export default ProjectButton