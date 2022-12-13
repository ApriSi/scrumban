import React, { useState, useEffect, useRef } from 'react'
import { fetchFromAPI, postToAPI, putToAPI } from '../utils/fetchFromApi'
import { useParams } from 'react-router'
import { List, Navbar } from '../components'
import { HideTextInput } from '../utils/utils'

document.addEventListener('click', function handleClick(event) {
    HideTextInput(event, 'list-div', 'show-list-button')
})

const Project = () => {
    const { id } = useParams()

    const projectTitle = useRef('')
    const [project, setProject] = useState([])
    const [lists, setLists] = useState([])

    useEffect(() => {
        fetchFromAPI(`projects/${id}`)
        .then((data) => {
            setProject(data)
        })
    }, [id])

    useEffect(() => {
        fetchFromAPI(`projects/list/${id}`)
        .then((data) => {
          setLists(data)
        }) 
    }, [id])


    const createList = (e) => {
        var titleInput = document.getElementById('list-title-input')
        if(titleInput.value == '') return

        
        postToAPI(`lists/${titleInput.value}/${id}`)
        .then((data) => {
            setLists((prevData) => prevData.concat(data))
            
        })
        .catch((res) => {
            console.log(res) 
        })
    }
    
    const renameProject = (e) => {
        document.getElementById('project-title-h1').style.display = ''
        e.target.style.display = 'none'
        if (projectTitle.current.value === '') {
            return
        }
        putToAPI(`projects/${projectTitle.current.value}/${id}`)
        .then((data) => {
            setProject(data)
        })
    }
    
    return (
        <div className='flex gap-4 bg-[#292929]'>
            <Navbar projectTitle={projectTitle} />
            <div className='flex flex-col gap-2 sticky pt-2'>
                <div className='hover:bg-gray-500 cursor-pointer bg-opacity-5 w-fit rounded pr-1 pl-1 pt-[0.2] pb-[0.2]'>
                    <h1 id='project-title-h1' className='font-bold' style={{display: ''}} onClick={(e) => {
                        e.target.style.display = 'none'
                        document.getElementById('project-title').style.display = 'block'
                        document.getElementById('project-title').value = e.target.innerText
                        document.getElementById('project-title').focus()
                    }}>{project?.Title}</h1>
                    <input id='project-title' type='text' className='hidden bg-transparent' ref={projectTitle} onBlur={(e) => renameProject(e)}/>
                </div>
                
                <div className='flex gap-4'>
                    {lists?.map((list, index) => (
                    <List key={index} id={list.Id} title={list.Title}/>
                    ))}

                    <div id="create-list-div" className='hidden flex-col gap-2 list-div h-16'>
                        <input id='list-title-input' type="text" placeholder='List Name' className='text-gray-500 rounded p-1'/>
                        <button onClick={(e) => createList(e)} className='w-100% h-7 bg-primary rounded'>Add</button>
                    </div>

                    <button className='bg-white bg-opacity-[0.2] hover:bg-opacity-[0.3] rounded w-[150px] h-10 text-left pl-2 show-list-button'><span className='font-bold'>+</span> Add List</button>
                </div>
            </div>
        </div>
    )
}

export default Project