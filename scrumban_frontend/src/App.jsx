import { Project, Navbar } from './components'
import { fetchFromAPI } from './utils/fetchFromApi'
import React, { useEffect, useState, useContext } from 'react';
import { ProjectContext } from './ProjectContext';

const App = () => {
  const {projectId, setProjectId} = useContext(ProjectContext)
  const [project, setProject] = useState([])

  useEffect(() => {
    fetchFromAPI(`projects/list/${projectId}`)
    .then((data) => setProject(data))
  }, [projectId])
  
  return (
    <div className='flex bg-gradient-to-t gap-3 from-[#4e3da6] to-[#021f45] h-screen w-screen text-white'>
      <Navbar />
      <Project key={project.Id} id={project.Id} title={project.Title} lists={project.List}/>
    </div>
  )
}

export default App
