import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from "react-router-dom"
import router from './routes/Router'
import { SessionProvider } from './contexts/Session.context'
import "bootstrap/dist/css/bootstrap.min.css"
import "./styles/global.css"

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <SessionProvider>
      <RouterProvider router={router} />
    </SessionProvider>
  </StrictMode>,
)