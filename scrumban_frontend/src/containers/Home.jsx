import { fetchFromAPI, postToAPI } from '../utils/fetchFromApi'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { HomeProjectButton } from '../components'

const Home = () => {
    const [projects, setProjects] = useState([])

    useEffect(() => {
        fetchFromAPI('projects').then((data) => setProjects(data))
    }, [])

    const createProject = () => {
      var titleInput = document.getElementById('project-title-input')
      var color = document.getElementById('color')

      if(titleInput.value == '') return
      
      postToAPI(`projects/${titleInput.value}/${color.value.replace('#', '')}`)
      .then((data) => {
        setProjects((prevsData) => prevsData.concat(data))
        OpenCreateMenu()
      })
      .catch((res) => {
        console.log(res)
      })
    }

    function OpenCreateMenu(){
      var element = document.getElementById('create-new-project-div');

      if(element.className == 'new-project-div'){
        element.className = 'new-project-div open'
      }else{
        element.className = 'new-project-div'
      }
    }

    return (
      <div className='flex flex-col gap-5 h-full w-full p-3 text-white'>
          <h1 className='text-center font-bold text-4xl'>Scrumban</h1>
          <div className='flex flex-wrap gap-2 bg-black w-full h-fit p-2 bg-opacity-[0.2] rounded '>
            {projects?.map((project, index) => (
                <HomeProjectButton key={index} color={project.Color} id={project.Id} title={project.Title} />
            ))}
            <div id='create-new-project-div' className='new-project-div'>
              <button className='add-project-button' onClick={OpenCreateMenu}>
                <h1>+</h1>
                <p>Add Project</p>
              </button>
              <div className='new-project-input-div hidden flex-col items-center gap-5 m-5'>
                <h1 className='font-bold' onClick={OpenCreateMenu}>Create New Project</h1>
                <div className='w-full flex'>
                  <input type='color' className='color' id='color'></input>
                  <input className='w-[70%] l-[20%] p-1 focus:outline-none rounded-l bg-black/[0.2]' type='text' id='project-title-input'></input>
                  <button className='bg-indigo-600 bg-opacity-[0.5] backdrop-blur-xl w-[20%] l-[20%] p-1 rounded-r' onClick={createProject}>Create</button>
                </div>
              </div>
            </div>
          </div>
      </div>
    )
}

export default Home