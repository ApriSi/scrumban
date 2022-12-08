import React, { useEffect, useState, useContext } from 'react'
import { fetchFromAPI } from '../utils/fetchFromApi'
import { ProjectContext } from '../ProjectContext';

const Navbar = () => {
  const {projectId, setProjectId} = useContext(ProjectContext)
  const [projects, setProjects] = useState([])

  useEffect(() => {
    fetchFromAPI(`projects`)
    .then((data) => setProjects(data))
  }, [])
  
  return (
    <div className='flex gap-2 flex-col h-screen p-2 bg-black bg-opacity-[0.2] w-[150px]'>
      <h1 className='text-center font-black'>Projects</h1>
    
      <div className='flex flex-col gap-2'>
        {projects?.map((project, index) => <button onClick={(e) => setProjectId(project.Id)} key={project.Id} id={project.Id} className='rounded bg-indigo-500 hover:bg-indigo-600 font-bold'>{project.Title}</button>)}
      </div>
      
      <button className='font-bold rounded bg-white bg-opacity-[0.2] hover:bg-opacity-[0.3]'>Create Project</button>
    </div>
  )
}

export default Navbar