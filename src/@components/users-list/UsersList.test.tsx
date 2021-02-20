import * as React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import { Provider } from 'jotai';
import UsersList from './UsersList.component';

afterEach(cleanup);

it('renders the spinner when loading prop is true', () => {
  const { getByTestId } = render(<UsersList isLoading={true} users={[]} />);
  expect(getByTestId('spinner')).toBeTruthy();
  expect(screen.queryByText(/No users/i)).toBeNull();
});

it('renders the no users message when there are no users found', () => {
  render(<UsersList isLoading={false} users={[]} />);
  expect(screen.queryByTestId('spinner')).toBeNull();
  expect(screen.getByText(/no users/i)).toBeTruthy();
});

it('renders the user list item when there are users in props', () => {
  const users = [
    {
      name: 'John',
      email: 'email@fake.com',
      picture: 'someURL',
      _id: 'random123',
    },
  ];
  render(
    <Provider>
      <UsersList isLoading={false} users={users} />
    </Provider>
  );
  expect(screen.queryByText(/no users/i)).toBeNull();
  expect(screen.getByText(/John/i)).toBeTruthy();
});
