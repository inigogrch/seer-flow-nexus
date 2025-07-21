import { createRoot } from 'react-dom/client'
import './index.css'

// Import the Next.js-style app structure
import HomePage from './app/page'

createRoot(document.getElementById("root")!).render(<HomePage />);