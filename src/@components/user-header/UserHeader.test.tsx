import React from 'react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import { render, waitFor, screen, fireEvent } from '@testing-library/react';

import { AuthProvider } from '@context/index';
import UserHeader from './UserHeader.component';

test('user-dropdown becomes visible when avatar is clicked', async () => {
  render(
    <BrowserRouter>
      <AuthProvider>
        <UserHeader name='Sven' />
      </AuthProvider>
    </BrowserRouter>
  );
  const avatar = await waitFor(() => screen.getByText('S'));
  expect(screen.queryByTestId('dropdown')).not.toBeInTheDocument();
  fireEvent.click(avatar);
  expect(screen.getByTestId('dropdown')).toBeVisible();
});
