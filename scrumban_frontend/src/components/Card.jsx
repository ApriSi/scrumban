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
        <div style={{display: "none"}} className="relative flex flex-col">
            <textarea onBlur={(e) => {
                var target = e.target;
                var paragraph = target.parentElement.parentNode.getElementsByTagName('p')[0]
                
                target.parentNode.style.display = 'none'
                paragraph.style.display = ''
                renameCard(e.target.value, paragraph)
            }} className='w-[100%] bg-transparent' />
            <div className='w-[100%] flow-root'>
                <input className='w-[25px] h-[20px] border border-white bg-gray-900' defaultValue="1"></input>
                <button className='text-lg'>🔼</button>
                <button className='text-lg'>🔽</button>
                <button className='hover:text-red-500 float-right' onClick={deleteCard}>X</button>

            </div>

        </div>
    </div>
)}

export default Card