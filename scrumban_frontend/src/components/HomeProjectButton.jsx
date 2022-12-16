import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { ProjectContext } from '../ProjectContext';
import { deleteFromAPI } from '../utils/fetchFromApi';

const ProjectButton = ({title, id, color}) => {
  const deleteProject = () => {
    document.getElementById(`project-${id}`).remove();
    deleteFromAPI(`projects/${id}`)
  }
  const { projectId, setProjectId } = useContext(ProjectContext)
  return (
    <div id={`project-${id}`} className='relative'>
      <Link onClick={(e) => setProjectId(id)} to={`/project/${id}`} className='h-fit'>
          <button className={`relative transition ease-in-out rounded h-[150px] w-[200px]  bg-black/[0.2] font-bold home-button`}>
              <div className={`absolute bottom-0 w-[100%] h-[10px] bg-color${color} rounded-b`}/>
              <p className='p-1 truncate'>{title}</p>    
          </button>

      </Link>
      <button className='absolute top-1 right-3 hover:text-red-500' onClick={deleteProject}>X</button>
    </div>
  )
}

export default ProjectButton