import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './index.css'
import { bootstrapApp } from './lib/api'
import { AuthProvider } from './context/AuthContext'
import { AppProvider } from './context/AppContext'

const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(<div className="container-main py-20 text-center text-slate-500">Загрузка BirgeWork...</div>)

bootstrapApp().then((bootstrap) => {
  root.render(
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
})
