import { Route, Routes } from 'react-router-dom'
import { Home, Project } from './containers'
import { ProjectContextProvider } from './ProjectContext'

const App = () => {
  return (
    <ProjectContextProvider>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/project/:id' element={<Project/>} />
      </Routes>
    </ProjectContextProvider>
  )
}

export default App
