import React from 'react'
import { Card } from './'

const List = ({Title, Cards}) => (
    <div className='bg-gray-200 shadow-md text-black p-2 rounded w-[150px]'>
        <h1 className='font-bold'>{Title}</h1>
        <div className='flex flex-col gap-2'>
            {Cards.map((description, key) => <Card key={key} Description={description}/>)}
        </div>
        <br />
        <button className='text-gray-500 hover:bg-gray-300 rounded p-1'><span>+</span>Add Card</button>
    </div>
)

export default List