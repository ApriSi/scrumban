import React, { useEffect, useState, useContext } from 'react'
import { fetchFromAPI, postToAPI } from '../utils/fetchFromApi'
import { ProjectContext } from '../ProjectContext';
import { HideTextInput } from '../utils/utils.js'

document.addEventListener('click', function handleClick(event) {
  HideTextInput(event, 'project-div', 'show-project-button')
})

const Navbar = () => {
  const {projectId, setProjectId} = useContext(ProjectContext)
  const [projects, setProjects] = useState([])

  
  const createProject = () => {
    var titleInput = document.getElementById('project-title-input')
    if(titleInput.value == '') return

    postToAPI(`projects/${titleInput.value}`)
    .then((data) => {
      setProjectId(data.Id)
    })
    .catch((res) => {
      console.log(res)
    })
  }
  
  useEffect(() => {
    fetchFromAPI(`projects`)
    .then((data) => setProjects(data))
  }, [projectId])

  return (
    <div className='flex gap-2 flex-col h-screen p-2 bg-black bg-opacity-[0.2] w-[150px]'>
      <h1 className='text-center font-black'>Projects</h1>
    
      <div className='flex flex-col gap-2'>
        {projects?.map((project, index) => <button onClick={(e) => setProjectId(project.Id)} key={project.Id} id={project.Id} className='rounded bg-indigo-500 hover:bg-indigo-600 font-bold'>{project.Title}</button>)}
      </div>
      
      <div id="create-project-div" className='hidden flex-col gap-2 project-div'>
        <input id='project-title-input' type="text" placeholder='Project Name' className='text-gray-500 rounded'/>
        <button onClick={createProject} className='w-100% bg-primary rounded'>Add</button>
      </div>
      <button id='project-display-button' className='font-bold rounded bg-white bg-opacity-[0.2] hover:bg-opacity-[0.3] show-project-button'>Create</button>
    </div>
  )
}

export default Navbar