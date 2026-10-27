import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@fontsource-variable/maven-pro'
import '@/index.css'
import LandingApp from './LandingApp'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LandingApp />
  </StrictMode>,
)
