import React, { useState, useEffect } from 'react'
import { fetchFromAPI, postToAPI, putToAPI } from '../utils/fetchFromApi'
import { useParams } from 'react-router'
import { List, Navbar } from '../components'
import { HideTextInput } from '../utils/utils'

document.addEventListener('click', function handleClick(event) {
    HideTextInput(event, 'list-div', 'show-list-button')
})

const Project = () => {
    const { id } = useParams()

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
    
    const renameProject = (name) => {
        const projectTitle = document.getElementById('project-title')
        if (name === '') {
            projectTitle.value = project.Title
            return
        }
        
        putToAPI(`projects/${name}/${id}`)
        .then((data) => {
            setProject(data)
        })
    }

    return (
        <div className='flex gap-4'>
            <Navbar />
            <div className='flex flex-col gap-2 sticky pt-2'>
                <h1 className='font-bold'>
                    <input id='project-title' type='text' className='bg-transparent' defaultValue={project.Title} onBlur={(e) => renameProject(e.currentTarget.value)}/>
                </h1>

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