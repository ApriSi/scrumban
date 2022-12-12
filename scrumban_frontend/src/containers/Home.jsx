import { fetchFromAPI } from '../utils/fetchFromApi'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ProjectButton } from '../components'

const Home = () => {
    const [projects, setProjects] = useState([])

    useEffect(() => {
        fetchFromAPI('projects').then((data) => setProjects(data))
    }, [])

    return (
      <div className='flex flex-col gap-5 h-full w-full p-3 text-white'>
          <h1 className='text-center font-bold text-4xl'>Scrumban</h1>
          <div className='flex flex-row gap-4 bg-black w-full h-full p-2 bg-opacity-[0.2] rounded'>
            {projects?.map((project, index) => (
                <ProjectButton key={index} id={project.Id} title={project.Title} />
            ))}
          </div>
      </div>
    )
}

export default Home