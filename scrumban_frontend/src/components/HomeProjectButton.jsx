import React from 'react'
import { Link } from 'react-router-dom'

const ProjectButton = ({title, id, color}) => {
  return (
    <Link to={`/project/${id}`} className='h-fit'>
        <button className={`transition ease-in-out rounded h-[150px] w-[200px] bg-color${color} font-bold p-1 home-button`}>{title}</button>
    </Link>
  )
}

export default ProjectButton