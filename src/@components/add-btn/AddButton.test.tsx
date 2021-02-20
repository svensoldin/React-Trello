import * as React from 'react';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';

import AddButton from './AddButton.component';

afterEach(cleanup);

it('renders the button, and when clicked it renders the input', () => {
  render(<AddButton id='random123' type='column' addFunction={() => {}} />);
  expect(screen.getByRole('button')).toBeInTheDocument();
  expect(screen.queryByRole('textbox')).not.toBeInTheDocument();
  fireEvent.click(screen.getByRole('button'));
  expect(screen.getByRole('textbox')).toBeInTheDocument();
  expect(screen.queryByRole('button')).not.toBeInTheDocument();
});

it("the input's value goes from empty to the user's value when the user types", () => {
  render(<AddButton id='random123' type='column' addFunction={() => {}} />);
  fireEvent.click(screen.getByRole('button'));
  const input = screen.getByRole('textbox') as HTMLInputElement;
  expect(input.value).toBeFalsy();
  fireEvent.change(input, { target: { value: 'my column title' } });
  expect(input.value).toBe('my column title');
});
