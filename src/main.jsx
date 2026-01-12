// Dependences
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './routes/App.jsx'

// * Styles * //
// General
import './styles/tailwind.css'
import './styles/global.scss'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
