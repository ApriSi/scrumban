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
      
      postToAPI(`projects/${titleInput.value}/${color.value}`)
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
      var input = document.getElementById('project-title-input');

      if(element.className == 'new-project-div'){
        element.className = 'new-project-div open'
        input.focus()  
      }else{
        element.className = 'new-project-div'
      }
    }

    function ChangeColor(){
      var colorInput = document.getElementById('color');
      var color = document.getElementById('color-visual')
      color.className = "rounded-l w-[10%] h-[23px] bg-color" + colorInput.value
    }

    return (
      <div className='flex flex-col gap-5 h-full w-full p-3 text-white'>
          <h1 className='text-center font-bold text-4xl'>Scrumban</h1>
          <div className='flex flex-wrap gap-2 bg-black w-full h-fit p-2 bg-opacity-[0.1] rounded '>
            {projects?.map((project, index) => (
                <HomeProjectButton key={index} color={project.Color} id={project.Id} title={project.Title} />
            ))}
            <div id='create-new-project-div' className='new-project-div'>
              <button className='relative add-project-button' onClick={OpenCreateMenu}>
                <h1>+</h1>
                <p>Add Project</p>
              </button>
              <div className='new-project-input-div hidden flex-col items-center gap-3 m-5'>
                <input className='w-[90%] l-[20%] p-1 focus:outline-none rounded bg-black/[0.2]' type='text' id='project-title-input' placeholder='Name'></input>
                <div className='w-[90%] flex items-center'>
                  <div id="color-visual" className='rounded-l w-[10%] h-[23px] bg-colorRed'></div>
                  <select name="colors" id="color" defaultValue="Red" className='bg-black focus:outline-none rounded-r w-[90%]' onChange={(e) => ChangeColor()}>
                    <option value="Black" className='bg-colorBlack'>Black</option>
                    <option value="Pink" className='bg-colorPink'>Pink</option>
                    <option value="Red" className='bg-colorRed'>Red</option>
                    <option value="Blue" className='bg-colorBlue'>Blue </option>
                    <option value="Cyan" className='bg-colorCyan'>Cyan</option>
                    <option value="Green" className='bg-colorGreen'>Green</option>
                    <option value="Yellow" className='bg-colorYellow'>Yellow</option>
                    <option value="Orange" className='bg-colorOrange'>Orange</option>
                    <option value="Magenta" className='bg-colorMagenta'>Magenta</option>
                  </select>              
                </div>
                <button className='bg-indigo-600 bg-opacity-[0.5] backdrop-blur-xl w-[90%] l-[20%] p-1 rounded' onClick={createProject} id="create-button">Create</button>
              </div>
            </div>
          </div>
      </div>
    )
}

export default Home