import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from '/src/pages/app/App.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
