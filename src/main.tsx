import { StrictMode } from 'react'
import './index.css'
import App from './App.tsx'
import store from './store/store.ts'
import { Provider } from 'react-redux'
import { createRoot } from 'react-dom/client'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
        <Provider store={store}>
          <App />
        </Provider>
  </StrictMode>,
)
