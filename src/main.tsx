import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

if(!import.meta.env.VITE_NODE_ENV) {
  const { worker } = await import('@/mocks/browser');
  worker.start()
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
