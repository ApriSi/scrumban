import {putToAPI, deleteFromAPI} from '../utils/fetchFromApi'


const Card = ({Description, id}) => {
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

    return (
    <div id={`card-${id}`} className='bg-white shadow-sm p-1 rounded hover:bg-slate-100 relative' title='Edit Text'>
        <p onClick={(e) => {
            var target = e.target;
            var input = target.parentElement.getElementsByTagName('textarea')[0]
            
            input.style.display = ''
            target.style.display = 'none'
            input.value = target.innerText
            input.focus()
        }} style={{display: '', wordWrap: 'break-word'}}>{Description}</p>

        <textarea onBlur={(e) => {
            var target = e.target;
            var paragraph = target.parentElement.getElementsByTagName('p')[0]
            
            target.style.display = 'none'
            paragraph.style.display = ''
            renameCard(e.target.value, paragraph)
        }} style={{display: 'none'}} className='w-[100%] bg-transparent' />
        
        <button className='absolute top-1 right-0 pr-1 hover:text-red-500' onClick={deleteCard}>X</button>
    </div>
)}

export default Card