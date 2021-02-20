import * as React from 'react';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';

import AddBoard from './AddBoard.component';
import { BrowserRouter } from 'react-router-dom';
import '@api/mutations';
import * as Helper from '@api/mutations';

jest.mock('@api/mutations');

const renderWrapper = (child: React.ReactNode) => {
  render(<BrowserRouter>{child}</BrowserRouter>);
};

afterEach(cleanup);
afterEach(jest.clearAllMocks);

it('opens the popper when button is clicked', () => {
  renderWrapper(<AddBoard />);
  expect(screen.getByRole('button')).toBeInTheDocument();
  expect(screen.queryByRole('textbox')).not.toBeInTheDocument();
  fireEvent.click(screen.getByRole('button'));
  expect(screen.getByRole('textbox')).toBeVisible();
});

it('gives the input the value of what the user types', () => {
  renderWrapper(<AddBoard />);
  fireEvent.click(screen.getByRole('button'));
  const input = screen.getByRole('textbox') as HTMLInputElement;
  fireEvent.change(input, { target: { value: 'my board' } });
  expect(input.value).toBe('my board');
});

it('calls the mutation function when user submits', () => {
  renderWrapper(<AddBoard />);
  fireEvent.click(screen.getByRole('button'));
  const input = screen.getByRole('textbox') as HTMLInputElement;
  fireEvent.change(input, { target: { value: 'my board' } });
  fireEvent.click(screen.getByText(/create/i));
  expect(Helper.createBoard).toHaveBeenCalled();
});
