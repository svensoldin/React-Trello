import * as React from 'react';
import { render, fireEvent, cleanup } from '@testing-library/react';

import { AuthProvider } from '@context/index';
import { Provider } from 'jotai';
import LoginForm from './LoginForm.component';

const renderWithTree = (child: React.ReactNode) => {
  return render(
    <AuthProvider>
      <Provider>{child}</Provider>
    </AuthProvider>
  );
};

afterEach(cleanup);

test('typing credentials updates the state', () => {
  const { getByLabelText } = renderWithTree(<LoginForm />);
  const emailInput = getByLabelText('email-input') as HTMLInputElement; // Cast the input element to the right type
  const passwordInput = getByLabelText('password-input') as HTMLInputElement;
  // Arrange
  expect(emailInput.value).toBe('');
  expect(passwordInput.value).toBe('');
  // Act
  fireEvent.change(emailInput, {
    target: { value: 'Some email' },
  });
  fireEvent.change(passwordInput, {
    target: { value: '12345678' },
  });
  // Assert
  expect(emailInput.value).toBe('Some email');
  expect(passwordInput.value).toBe('12345678');
});
