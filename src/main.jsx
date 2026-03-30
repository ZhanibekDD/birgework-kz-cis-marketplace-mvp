import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './index.css'
import { getBootstrapData } from './lib/api'
import { AuthProvider } from './context/AuthContext'
import { AppProvider } from './context/AppContext'

const bootstrap = getBootstrapData()

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider initialUser={bootstrap.authUser}>
        <AppProvider initialState={bootstrap}>
          <App />
        </AppProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
