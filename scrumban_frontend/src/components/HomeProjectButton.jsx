import React from 'react'
import { Link } from 'react-router-dom'

const ProjectButton = ({title, id, color}) => {
    const _color = color;
  return (
    <Link to={`/project/${id}`} className='h-fit'>
        <button style={{backgroundColor: color + "60"}} className='rounded h-[150px] w-[200px] font-bold p-1 home-button'>{title}</button>
    </Link>
  )
}

export default ProjectButton