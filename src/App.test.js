import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event'

import App from './App';

test('inputs should initially empty', () => {
  render(<App />)

  const inputEmailElement = screen.getByRole('textbox');
  const inputPasswordElement = screen.getByLabelText("Password");
  const confirmInputPasswordElement = screen.getByLabelText(/confirm password/i);

  expect(inputEmailElement.value).toBe('');
  expect(inputPasswordElement.value).toBe('');
  expect(confirmInputPasswordElement.value).toBe('');
})

test('should be able to type an email', () => {
  render(<App />)

  const inputEmailElement = screen.getByRole('textbox', {
    name: /email/i
  });

  userEvent.type(inputEmailElement, 'dubstr1@gmail.com')
  expect(inputEmailElement.value).toBe('dubstr1@gmail.com')
})

test('should be able to type a password', () => {
  render(<App />)

  const inputPasswordElement = screen.getByLabelText('Password')

  userEvent.type(inputPasswordElement, 'password!')
  expect(inputPasswordElement.value).toBe('password!')
})

test('should be able to type a confirm password', () => {
  render(<App />)

  const confirmInputPasswordElement = screen.getByLabelText(/confirm password/i);
  userEvent.type(confirmInputPasswordElement, 'password!')
  expect(confirmInputPasswordElement.value).toBe('password!')
})