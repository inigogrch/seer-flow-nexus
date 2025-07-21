import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

console.log('Main.tsx loaded')

const root = createRoot(document.getElementById("root")!)
console.log('Root created, rendering App...')
root.render(<App />)
console.log('App rendered successfully')
