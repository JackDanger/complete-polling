import ReactDOM from 'react-dom/client'
import App from './App'
import PollsList from './components/PollsList'
import AddPoll from './components/AddPoll'
import Poll from './components/Poll.jsx'


import React from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'

const routesConfig = [
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: < PollsList /> },
      { path: "/polls", element: < PollsList /> },
      { path: "/add", element: < AddPoll /> },
      { path: "/polls/:id", element: < Poll /> },
    ]
  },
  {
    path: "/polls",
    element: <PollsList />,
  }
];

const router = createBrowserRouter(routesConfig);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)

export default { routesConfig };
