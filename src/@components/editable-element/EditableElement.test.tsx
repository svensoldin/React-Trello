import * as React from 'react';
import { render, fireEvent, cleanup, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import { Provider } from 'jotai';
import EditableElement from './EditableElement.component';
import { updateCardField } from '@api/mutations';

jest.mock('@api/mutations', () => {
  return {
    updateCardField: jest.fn(),
  };
});

afterEach(cleanup);

test('renders the HTMLElement at first, then the appropriate input when clicked', () => {
  render(
    <Provider>
      <EditableElement
        HTMLElement='h1'
        id='whatever'
        innerText='John'
        field='title'
        updaterFunction={updateCardField}
      />
    </Provider>
  );
  expect(screen.getByText('John')).toBeInTheDocument();
  fireEvent.click(screen.getByText('John'));
  expect(screen.getByRole('textbox')).toBeInTheDocument();
});
