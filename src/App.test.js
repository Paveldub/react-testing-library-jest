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