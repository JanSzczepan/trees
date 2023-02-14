import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'
import { UserContextProvider } from './contexts/userContext'
import { TreeContextProvider } from './contexts/treesContext'
import { AddTreePhaseContextProvider } from './contexts/addTreePhase'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
   <React.StrictMode>
      <BrowserRouter>
         <UserContextProvider>
            <TreeContextProvider>
               <AddTreePhaseContextProvider>
                  <App />
               </AddTreePhaseContextProvider>
            </TreeContextProvider>
         </UserContextProvider>
      </BrowserRouter>
   </React.StrictMode>
)

reportWebVitals()
