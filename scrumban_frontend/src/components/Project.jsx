import React, { useEffect, useState } from 'react'
import { postToAPI } from '../utils/fetchFromApi'
import List from './List'
import { HideTextInput } from '../utils/utils.js'

document.addEventListener('click', function handleClick(event) {
  HideTextInput(event, 'list-div', 'show-list-button')
})

const Project = ({id, title, lists}) => {

  const createList = (e) => {
    var titleInput = document.getElementById('list-title-input')
    if(titleInput.value == '') return

    postToAPI(`lists/${titleInput.value}/${id}`)
    .then((data) => {
    })
    .catch((res) => {
      console.log(res)
    })
  }

  return (
    <div className='flex flex-col gap-2 mt-1'>
        <h1 className='font-bold'>
          <input type='text' className='bg-transparent' defaultValue={title}/>
        </h1>

        <div className='flex gap-4'>
            {lists?.map((list, index) => (
              <List key={list.Id} id={list.Id} title={list.Title}/>
            ))}

            <div id="create-list-div" className='hidden flex-col gap-2 list-div h-16'>
              <input id='list-title-input' type="text" placeholder='List Name' className='text-gray-500 rounded p-1'/>
              <button onClick={(e) => createList(e)} className='w-100% h-7 bg-primary rounded'>Create</button>
            </div>

            <button className='bg-white bg-opacity-[0.2] hover:bg-opacity-[0.3] rounded w-[150px] h-10 text-left pl-2 show-list-button'><span className='font-bold'>+</span> Add List</button>
        </div>
    </div>
  )
}

export default Project