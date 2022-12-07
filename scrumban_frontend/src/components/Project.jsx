import React, { useEffect, useState } from 'react'
import { fetchFromAPI } from '../utils/fetchFromApi'
import List from './List'

const Project = ({title}) => {
    const [lists, setLists] = useState([])
    useEffect(() => {
      fetchFromAPI('lists').then((data) => setLists(data))
    }, [lists])

  return (
    <div className='flex flex-col gap-2'>
        <h1 className='font-bold'>{title}</h1>
        <div className='flex gap-4'>
            {lists.map((list, index) => (
            <List key={index} title={list.Title} cards={["test"]} />
            ))}
            
            <button className='bg-white bg-opacity-[0.2] hover:bg-opacity-[0.3] rounded w-[150px] h-10 text-left pl-2'><span className='font-bold'>+</span> Add List</button>
        </div>
    </div>
  )
}

export default Project