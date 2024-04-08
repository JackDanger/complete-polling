import React from 'react';
import App from './App';
import AddPoll from './components/AddPoll';
import Poll from './components/Poll.jsx';
import PollsList from './components/PollsList';

export const routesConfig = [
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <PollsList /> },
      { path: "/polls", element: <PollsList /> },
      { path: "/add", element: <AddPoll /> },
      { path: "/polls/:id", element: <Poll /> },
    ]
  },
  {
    path: "/polls",
    element: <PollsList />,
  }
];
