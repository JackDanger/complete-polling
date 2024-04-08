import { describe } from 'vitest';
import { render, screen } from '@testing-library/react';
import "@testing-library/jest-dom";
import { MemoryRouter, RouterProvider, BrowserRouter, createMemoryRouter } from 'react-router-dom'
import App from './App';
import { routesConfig } from './main';

describe('start page', () => {
  it('renders the navigation', () => {
    const { debug, getByText } = render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );

    debug()

    expect(getByText(/Polls4Days/i)).toBeInTheDocument();
    expect(getByText(/Make One/i)).toBeInTheDocument();
  })
});
