import React, { useEffect, useState, useContext } from 'react'
import { fetchFromAPI, postToAPI } from '../utils/fetchFromApi'
import { ProjectContext } from '../ProjectContext';
import {ProjectButton} from './';
import { Link } from 'react-router-dom';

const Navbar = (projectTitle) => {
  const {projectId, setProjectId} = useContext(ProjectContext)
  const [projects, setProjects] = useState([])
  
  useEffect(() => {
    fetchFromAPI(`projects`)
    .then((data) => setProjects(data))
  }, [projectId, projectTitle])

  return (
    <div className='flex gap-2 flex-col h-screen p-2 bg-black bg-opacity-[0.2] w-[150px]'>
      <Link to='/'><button className='text-center font-black bg-primary hover:bg-opacity-[0.8] rounded w-full'>Projects</button></Link>
    
      <div className='flex flex-col gap-2'>
        {projects?.map((project, index) => <ProjectButton key={index} id={project.Id} title={project.Title} />)}
      </div>
    </div>
  )
}

export default Navbar