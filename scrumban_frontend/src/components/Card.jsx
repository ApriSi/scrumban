import {putToAPI} from '../utils/fetchFromApi'


const Card = ({Description, id}) => {
    const renameCard = (description, paragraph, e) => {
        if (description === '') {
            return
        }
        paragraph.innerText = description
        putToAPI(`cards/${description}/${id}`)
    }

    return (
    <div className='bg-white shadow-sm p-1 rounded'>
        <p onClick={(e) => {
            var target = e.target;
            var input = target.parentElement.getElementsByTagName('input')[0]
            
            input.style.display = ''
            target.style.display = 'none'
            input.value = target.innerText
            input.focus()
        }} style={{display: ''}}>{Description}</p>

        <input onBlur={(e) => {
            var target = e.target;
            var paragraph = target.parentElement.getElementsByTagName('p')[0]
            
            target.style.display = 'none'
            paragraph.style.display = ''
            renameCard(e.target.value, paragraph)
        }} style={{display: 'none'}} type='text' className='w-[100%] bg-transparent' />
    </div>
)}

export default Card