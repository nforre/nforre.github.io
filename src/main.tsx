import { createRoot } from 'react-dom/client'
import 'lenis/dist/lenis.css'
import './styles.css'
import App from './App'
document.documentElement.classList.add('js')
createRoot(document.getElementById('root')!).render(<App />)
