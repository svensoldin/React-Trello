import * as React from 'react';
import axios from '@api/config';
import { render, fireEvent } from '@testing-library/react';

import { AuthProvider } from '@context/index';
import { Provider } from 'jotai';
import SearchUser from './SearchUser.component';

const renderWithTree = (child: React.ReactNode) => {
  return render(
    <AuthProvider>
      <Provider>{child}</Provider>
    </AuthProvider>
  );
};

jest.mock('@api/config');

test('A search for John returns John in the user list below', async () => {
  (axios.get as jest.Mock).mockResolvedValue({
    data: [
      {
        name: 'John',
        email: 'john@gmail.com',
        picture: 'www.mypicture.com',
        _id: 'random123',
      },
    ],
  });

  const { findByText, getByPlaceholderText } = renderWithTree(
    <SearchUser closePopper={() => {}} />
  );
  const input = getByPlaceholderText('search users..');
  fireEvent.change(input, { target: { value: 'John' } });
  await findByText('John');
});

afterEach(jest.resetAllMocks);
