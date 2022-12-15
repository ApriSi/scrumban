import {putToAPI, deleteFromAPI} from '../utils/fetchFromApi'
import { ArrowUpward, ArrowDownward, DeleteForever } from '@mui/icons-material';
import { SvgIcon } from '@mui/material';


const Card = ({Description, id, listId, priority, cardLength}) => {
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

    const moveTop = (e) => {
        textAreaFocus(e)
        var newPriority = priority - 1
        
        if(priority == 1) return
        putToAPI(`cards/switch/${id}/${listId}/${newPriority}/${priority}`)
    }

    const moveBottom = (e) => {
        textAreaFocus(e)
        var newPriority = priority + 1

        if(cardLength == priority) return
        putToAPI(`cards/switch/${id}/${listId}/${newPriority}/${priority}`)
        
    }

    const moveIndex = (e) => {
        textAreaFocus(e)
    }

    return (
    <div id={`card-${id}`} className=' bg-gray-900 border border-indigo-600 p-1 rounded hover:bg-gray-800 relative' title='Edit Text'>
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
                <input className='w-[25px] h-[20px] border border-white bg-gray-900' onBlur={(e) => moveIndex(e)} defaultValue="1"></input>
                <button className='text-lg hover:text-indigo-600' onClick={(e) => moveTop(e)}><SvgIcon component={ArrowUpward}/></button>
                <button className='text-lg hover:text-indigo-600' onClick={(e) => moveBottom(e)}><SvgIcon component={ArrowDownward}/></button>
                <button className='hover:text-red-500 float-right' onClick={deleteCard}><SvgIcon component={DeleteForever}/></button>
            </div>
        </div>
    </div>
)}

export default Card