import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './pages/App.tsx'
import './index.css'
import { UserContextProvider } from './contexts/UserContext.tsx'
import { CookiesProvider, useCookies } from "react-cookie";

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <CookiesProvider>
    <UserContextProvider>
     <App />
    </UserContextProvider>
    </CookiesProvider>
  </React.StrictMode>,
)
