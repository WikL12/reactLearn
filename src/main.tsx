import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

//redux
import store from './store';
import { Provider } from 'react-redux';
// router
import router from './router/index.jsx';
import { RouterProvider } from 'react-router-dom';




ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
    <App />
    <RouterProvider router={router}>
    </RouterProvider>
    </Provider>
   </React.StrictMode>,
)
