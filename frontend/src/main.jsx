import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from "react-redux";
import './index.css'
import AppRouter from './routes/AppRoutes.jsx'
import { store } from './context/store.js';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store = {store}>
      <AppRouter />
    </Provider>
  </StrictMode>,
)
