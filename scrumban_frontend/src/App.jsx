import { List } from './components'

function App() {
  return (
    <div className='p-3 bg-gradient-to-tr from-indigo-500 to-red-500 h-full w-full absolute text-white'>
      <div className='flex gap-4'>
        <List Title="Title" Cards={[
          "This is a cool todo",
          "This is another cool todo",
          "This is another todo, but even more chad"
        ]}/>

        <List Title="WoW" Cards={[
          "EAEA",
          "KEKW",
          "FIX SIZE FOR LIST LOL"
        ]}/>
        <button className='bg-white bg-opacity-[0.2] hover:bg-opacity-[0.3] rounded w-[150px] h-10 text-left pl-2'><span className='font-bold'>+</span> Add List</button>
      </div>
    </div>
  )
}

export default App
