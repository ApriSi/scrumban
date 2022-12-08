import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './tailwind.css'
import { ProjectContextProvider } from './ProjectContext'

ReactDOM.createRoot(document.getElementById('root')).render(
  //<React.StrictMode>
  <ProjectContextProvider>
    <App />
  </ProjectContextProvider>
  //</React.StrictMode>
)
