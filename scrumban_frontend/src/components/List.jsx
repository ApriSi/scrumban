import React, { useState, useEffect } from 'react'
import { fetchFromAPI, postToAPI, putToAPI } from '../utils/fetchFromApi'
import { Card } from './'
import { HideTextInput } from '../utils/utils.js'


const List = ({id, title}) => {
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

         postToAPI(`cards/${titleInput.value}/${id}`)
         .then((data) => setCards(cards.concat(data)))
    }
    // Oh god 🤢🤢🤢🤢🤢🤢 the code 🤢🤢🤢🤢🤢🤢🤢 🗿 🤢🤢🤢🤢🤢🤢🤢 it's bad ( but it works )
    return(
        <div className='bg-gray-200 shadow-md text-black p-2 rounded w-[150px] h-fit'>
            <div>
                <h1 className='font-bold' onClick={(e) => {
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
            </div>
            <div className='flex flex-col gap-2'>
                {cards?.map((card, key) => <Card id={card.Id} key={key} Description={card.Description}/>)}
                
                <div id="create-card-div" className={`hidden flex-col gap-2 card-div-${id} h-16`}>
                    <input id={`card-title-input-${id}`} type="text" placeholder='Card Name' className='text-gray-500 rounded p-1'/>
                    <button onClick={(e) => createCard()} className='w-100% h-7 bg-primary rounded text-white'>Add</button>
                </div>
                
                <button className={`text-gray-500 hover:bg-gray-300 rounded p-1 w-100% text-left show-card-button-${id}`}><span>+</span>Add Card</button>
                
            </div>
        </div>
    )
} 

export default List