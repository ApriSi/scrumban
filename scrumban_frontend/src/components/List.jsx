import React, { useState, useEffect } from 'react'
import { fetchFromAPI, postToAPI, putToAPI, deleteFromAPI } from '../utils/fetchFromApi'
import { Card } from './'
import { HideTextInput } from '../utils/utils.js'
import { Clear } from '@mui/icons-material'
import { SvgIcon } from '@mui/material'




const List = ({id, title, color}) => {
    const [cards, setCards] = useState([])
    
    document.addEventListener('click', function handleClick(event) {
        HideTextInput(event, `card-div-${id}`, `show-card-button-${id}`)
    })
  
    useEffect(() => {
      fetchFromAPI(`cards/list/${id}`)
      .then((data) => setCards(data))
    }, [id])

    const renameList = (newTitle, titleElement, e) => {
        if (newTitle === '') {
            return
        }
        titleElement.innerText = newTitle

        putToAPI(`lists/${newTitle}/${id}`)
    }
    
    const createCard = () => {
        var titleInput = document.getElementById(`card-title-input-${id}`)
        if(titleInput.value == '') return
        var newPriority = cards.length + 1
        postToAPI(`cards/${titleInput.value}/${id}/${newPriority}`)
        .then((data) => setCards(cards.concat(data)))
    }

    const deleteCard = () => {
        document.getElementById(`list-${id}`).remove();
        deleteFromAPI(`lists/${id}`)
    }

    // Oh god 🤢🤢🤢🤢🤢🤢 the code 🤢🤢🤢🤢🤢🤢🤢 🗿 🤢🤢🤢🤢🤢🤢🤢 it's bad ( but it works )
    return(
        <div id={`list-${id}`} className='flex flex-col bg-gray-800 shadow-2xl shadow-indigo-600/[0.2] text-white p-2 rounded min-w-[200px] w-[200px] h-fit relative gap-2'>
            <h1 title='Edit Text' className='font-bold text-center hover:bg-gray-800 rounded' onClick={(e) => {
                var target = e.target;
                var input = target.parentElement.getElementsByTagName('input')[0]

                input.style.display = ''
                target.style.display = 'none'
                input.value = target.innerText
                input.focus()
            }}>{title}</h1>

            <input onBlur={(e) => {
                var target = e.target;
                var paragraph = target.parentElement.getElementsByTagName('h1')[0]
                        
                target.style.display = 'none'
                paragraph.style.display = ''
                renameList(e.target.value, paragraph)
            }} style={{display: 'none'}} type='text' className='w-[100%] bg-transparent' />

                <button className='absolute top-0 right-0 pt-1 pr-2 hover:text-red-500' onClick={deleteCard}><SvgIcon fontSize='small' component={Clear}/></button>
            <div className='flex flex-col gap-2'>
                <div className='flex flex-col gap-2'>
                    {cards?.map((card, key) => <Card cardLength={cards.length} listId={card.ListId} priority={card.Priority} id={card.Id} key={card.Id} Description={card.Description}/>)}
                </div>
                
                <div id="create-card-div" className={`hidden card-div-${id}`}>
                    <input id={`card-title-input-${id}`} type="text" placeholder='Card Name' className='text-gray-500 focus:outline-none rounded-l p-1 w-[80%] h-[30px]'/>
                    <button onClick={(e) => createCard()} className={`bg-indigo-600 rounded-r text-white w-[20%] h-[30px]`}>Add</button>
                </div>
                
                <button title="Add New Card" className={`text-gray-500 hover:bg-gray-800 rounded p-1 w-100% h-[30px] text-left show-card-button-${id}`}>+ Add Card</button>  
            </div>
        </div>
    )
} 

export default List