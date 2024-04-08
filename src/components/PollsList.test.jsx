import "@testing-library/jest-dom";
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe } from 'vitest';
import PollsList from './PollsList';

describe('view', () => {
  it('lists polls', () => {
    const { debug, getByText } = render(
      <BrowserRouter>
        <PollsList />
      </BrowserRouter>
    );

    debug()

    expect(getByText(/Polls/i)).toBeInTheDocument();
  })
});
