import { describe } from 'vitest';
import { render, screen } from '@testing-library/react';
import "@testing-library/jest-dom";
import { MemoryRouter, RouterProvider } from 'react-router-dom'
import App from './App';
import { routesConfig } from './main';

describe('start page', () => {
  it('renders the navigation', () => {
    //const { debug, getByText } = render(
    //  <MemoryRouter>
    //    <App />
    //  </MemoryRouter>
    //);

    //debug()

    expect(getByText(/Polls4Days/i)).toBeInTheDocument();
    expect(getByText(/Make One/i)).toBeInTheDocument();
  })
});
