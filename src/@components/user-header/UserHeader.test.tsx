import React from 'react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import { render, waitFor, screen, fireEvent } from '@testing-library/react';

import { AuthProvider } from '@context/index';
import UserHeader from './UserHeader.component';

test('shows skeleton on first render, then shows the Avatar component', async () => {
  render(
    <AuthProvider>
      <UserHeader name='Sven' />
    </AuthProvider>
  );
  // Avatar should not be in the doc, skeleton should be
  expect(screen.getByTestId('skeleton')).toBeInTheDocument();
  expect(screen.queryByAltText('Sven')).not.toBeInTheDocument(); // queryBy instead of getBy which would throw an error
  await waitFor(() => screen.getByAltText('Sven'));
  expect(screen.getByAltText('Sven')).toBeInTheDocument();
});

test('user-dropdown becomes visible when avatar is clicked', async () => {
  render(
    <BrowserRouter>
      <AuthProvider>
        <UserHeader name='Sven' />
      </AuthProvider>
    </BrowserRouter>
  );
  await waitFor(() => screen.getByAltText('Sven'));
  expect(screen.queryByTestId('dropdown')).not.toBeInTheDocument();
  fireEvent.click(screen.getByAltText('Sven'));
  expect(screen.getByTestId('dropdown')).toBeVisible();
});
