import React from 'react';
import App from './App';
import Poll from './components/Poll.jsx';
import NewPoll from './components/NewPoll.jsx';
import PollsList from './components/PollsList';

export const routesConfig = [
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <PollsList /> },
      { path: "/polls", element: <PollsList /> },
      { path: "/polls/:id", element: <Poll /> },
      { path: "/polls/new", element: <NewPoll /> },
    ]
  },
  {
    path: "/polls",
    element: <PollsList />,
  }
];
