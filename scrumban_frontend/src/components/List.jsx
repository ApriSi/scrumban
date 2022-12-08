import React, {useState, useEffect} from 'react'
import { fetchFromAPI } from '../utils/fetchFromApi'
import { Card } from './'

const List = ({id, title}) => {
    const [cards, setCards] = useState([])
  
    useEffect(() => {
      fetchFromAPI(`cards/list/${id}`)
      .then((data) => setCards(data))
    }, [])
    
    return(
        <div className='bg-gray-200 shadow-md text-black p-2 rounded w-[150px] h-fit'>
            <h1 className='font-bold'>{title}</h1>
            <div className='flex flex-col gap-2'>
                {cards?.map((card, key) => <Card key={key} Description={card.Description}/>)}
               
                <button className='text-gray-500 hover:bg-gray-300 rounded p-1 w-100% text-left'><span>+</span>Add Card</button>
            </div>
        </div>
    )
} 

export default List