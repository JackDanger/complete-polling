import ReactDOM from 'react-dom/client'


import React from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { routesConfig } from './routesConfig.jsx'

const router = createBrowserRouter(routesConfig);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
