import React from 'react'
import { Link } from 'react-router-dom'

const ProjectButton = ({title, id, color}) => {
  return (
    <Link to={`/project/${id}`} className='h-fit'>
        <button className={`relative transition ease-in-out rounded h-[150px] w-[200px]  bg-black/[0.2] font-bold home-button`}>
            <div className={`absolute bottom-0 w-[100%] h-[10px] bg-color${color} rounded-b`}/>
            <p className='p-1'>{title}</p>    
        </button>
    </Link>
  )
}

export default ProjectButton