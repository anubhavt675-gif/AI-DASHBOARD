import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { store } from './redux/store'
import './index.css'
import App from './App.jsx'

// Apply saved theme on load
const savedTheme = localStorage.getItem('theme') ||
  (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
if (savedTheme === 'dark') document.documentElement.classList.add('dark');

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 3000,
            style: {
              background: 'var(--toast-bg, #1e293b)',
              color: '#f1f5f9',
              borderRadius: '12px',
              border: '1px solid rgba(255,255,255,0.1)',
            },
          }}
        />
      </BrowserRouter>
    </Provider>
  </StrictMode>,
)
