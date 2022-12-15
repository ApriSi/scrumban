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
    <div className='flex gap-2 flex-row h-[50px] p-2 bg-gray-700 w-screen overflow-x-auto'>
      <Link to='/'><button className='text-center font-black bg-gray-800 hover:bg-indigo-600 rounded h-[100%] w-[100px]'>Projects</button></Link>
    
      <div className='flex flex-row gap-2'>
        {projects?.map((project, index) => <ProjectButton key={index} id={project.Id} color={project.Color} title={project.Title} />)}
      </div>
    </div>
  )
}

export default Navbar