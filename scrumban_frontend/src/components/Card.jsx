import {putToAPI, deleteFromAPI} from '../utils/fetchFromApi'
import { ArrowUpward, ArrowDownward, DeleteForever, ArrowLeft, ArrowRight } from '@mui/icons-material';
import { SvgIcon } from '@mui/material';
import { useContext } from 'react';
import { ProjectContext } from '../ProjectContext';


const Card = ({Description, id, listId, priority, cardLength}) => {
    const { projectId, setProjectId } = useContext(ProjectContext)
    
    const renameCard = (description, paragraph, e) => {
        if (description === '') {
            return
        }
        paragraph.innerText = description
        putToAPI(`cards/${description}/${id}`)
    }

    const deleteCard = () => {
        document.getElementById(`card-${id}`).remove();
        deleteFromAPI(`cards/${id}`)
    }

    const textAreaFocus = (e) => {
        var textArea = e.currentTarget.parentNode.parentNode.getElementsByTagName('textarea')[0]
        textArea.focus()
    }

    const moveTop = async (e) => {
        textAreaFocus(e)
        var newPriority = priority - 1

        if(priority == 1) return
        //e.target.style.order = newPriority

        putToAPI(`cards/switch/${id}/${listId}/${newPriority}/${priority}`)
    }
    
    function FindByAttributeValue(attribute, value, element_type)    {
        element_type = element_type || "*";
        var All = document.getElementById(element_type).getElementsByTagName('div');
        for (var i = 0; i < All.length; i++)       {
          if (All.getAttribute(attribute) == value) { return All; }
        }
    }

    const moveBottom = (e) => {
        textAreaFocus(e)
        var newPriority = priority + 1
        
        if(cardLength == priority) return
        var secondCard = FindByAttributeValue('priority', priority, `input`)
        console.log(secondCard)

        putToAPI(`cards/switch/${id}/${listId}/${newPriority}/${priority}`)
    }

    const changeListRight = (e) => {
        textAreaFocus(e)

        ++listId
        var newListElement = document.getElementById(`list-${listId}`).getElementsByTagName('div')[0].getElementsByTagName('div')[0]

        newListElement.append(document.getElementById(`card-${id}`))
        putToAPI(`cards/changeList/${id}/${listId}`)

    }

    const changeListLeft = (e) => {
        textAreaFocus(e)
        
        --listId
        var newListElement = document.getElementById(`list-${listId}`).getElementsByTagName('div')[0].getElementsByTagName('div')[0]
        newListElement.append(document.getElementById(`card-${id}`))
        putToAPI(`cards/changeList/${id}/${listId}`)
    }

    return (
    <div id={`card-${id}`} priority={priority} className=' bg-gray-900 border border-indigo-600 p-1 rounded hover:bg-gray-800 relative' style={{order: priority}} title='Edit Text'>
        <p onClick={(e) => {
            var target = e.target;
            var div = target.parentElement.getElementsByTagName('div')[0]
            var input = div.getElementsByTagName('textarea')[0]
            
            div.style.display = ''
            target.style.display = 'none'
            input.value = target.innerText
            input.focus()
        }} style={{display: '', wordWrap: 'break-word'}}>{Description}</p>
        <div id='edit-content' style={{display: "none"}} className="relative flex flex-col">
            <textarea id='text-area' onBlur={(e) => {
                if (e.currentTarget.parentElement.contains(e.relatedTarget)) return
                var target = e.target;
                var paragraph = target.parentElement.parentNode.getElementsByTagName('p')[0]
                
                target.parentNode.style.display = 'none'
                paragraph.style.display = ''
                renameCard(e.target.value, paragraph)
            }} className='w-[100%] bg-transparent' />
            <div className='w-[100%] flow-root mt-2'>
                <button className='text-lg hover:text-indigo-600' onClick={changeListLeft}><SvgIcon component={ArrowLeft}/></button>
                <button className='text-lg hover:text-indigo-600' onClick={(e) => moveTop(e)}><SvgIcon component={ArrowUpward}/></button>
                <button className='text-lg hover:text-indigo-600' onClick={(e) => moveBottom(e)}><SvgIcon component={ArrowDownward}/></button>
                <button className='text-lg hover:text-indigo-600' onClick={changeListRight}><SvgIcon component={ArrowRight}/></button>

                <button className='hover:text-red-500 float-right' onClick={deleteCard}><SvgIcon component={DeleteForever}/></button>
            </div>
        </div>
    </div>
)}

export default Card