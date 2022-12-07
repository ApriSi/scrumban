import { Project, Navbar } from './components'
import { fetchFromAPI } from './utils/fetchFromApi'
import React, { useEffect, useState} from 'react';

function App() {
  const [projects, setProjects] = useState([])
  
  useEffect(() => {
    fetchFromAPI("projects/list")
    .then((data) => setProjects(data))
  }, [projects])

  return (
    <div className='flex bg-gradient-to-tr gap-3 from-indigo-500 to-red-500 h-full w-full absolute text-white'>
      <div className='flex flex-col gap-4 p-3'>
        
        {
          projects.map((project) => (
            <Project key={project.Id} title={project.Title}/>
          ))
        }


        
      </div>
      <button className='fixed bottom-1 right-2 p-2 font-bold bg-white bg-opacity-[0.2] hover:bg-opacity-[0.3]'>Create Project</button>
    </div>
  )
}

export default App
