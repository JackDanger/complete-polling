import React from 'react';
import App from './App';
import Poll from './components/Poll.jsx';
import PollsList from './components/PollsList';
import PollForm from './components/PollForm.jsx';

export const routesConfig = [
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <PollsList /> },
      { path: "/polls", element: <PollsList /> },
      { path: "/polls/:id", element: <Poll /> },
      { path: "/polls/new", element: <PollForm /> },
      { path: "/polls/:id/edit", element: <PollForm /> },
    ]
  },
  {
    path: "/polls",
    element: <PollsList />,
  }
];
