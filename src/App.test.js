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

test('shod show email error message or invalid email', () => {
  render(<App />)

  const emailErrorElemet = screen.queryByText(/the email you input is invalid/i)
  const inputEmailElement = screen.getByRole('textbox', {
    name: /email/i
  });
  const submitButtonElement = screen.getByRole('button', {
    name: /submit/i
  })

  expect(emailErrorElemet).not.toBeInTheDocument();

  userEvent.type(inputEmailElement, 'dubstr1gmail.com') // without @
  userEvent.click(submitButtonElement)

  const emailErrorElemetAgain = screen.queryByText(/the email you input is invalid/i)

  expect(emailErrorElemetAgain).toBeInTheDocument()
})

test('should show password error if password is less than 5 characters', () => {
  render(<App />)

  const inputEmailElement = screen.getByRole('textbox', {
    name: /email/i
  });
  const submitButtonElement = screen.getByRole('button', {
    name: /submit/i
  })
  const inputPasswordElement = screen.getByLabelText("Password");
  const passwordErrorElemet = screen.queryByText(/the password you entered should contain 5 or more characters/i)
 
  userEvent.type(inputEmailElement, 'dubstr@1gmail.com')

  expect(passwordErrorElemet).not.toBeInTheDocument();

  userEvent.type(inputPasswordElement, "123")
  userEvent.click(submitButtonElement)

  const passwordErrorElemetAgain = screen.queryByText(/the password you entered should contain 5 or more characters/i)
  expect(passwordErrorElemetAgain).toBeInTheDocument()
})

test('should show confirm password error if password do not match', () => {
  render(<App />)

  const inputEmailElement = screen.getByRole('textbox', {
    name: /email/i
  });
  const submitButtonElement = screen.getByRole('button', {
    name: /submit/i
  })
  const inputPasswordElement = screen.getByLabelText("Password");
  const confirmPasswordErrorElemet = screen.queryByText(/the passwords do not match. try again/i)
  const confirmInputPasswordElement = screen.getByLabelText(/confirm password/i);
 
  userEvent.type(inputEmailElement, 'dubstr@1gmail.com')
  userEvent.type(inputPasswordElement, '12345')

  expect(confirmPasswordErrorElemet).not.toBeInTheDocument();

  userEvent.type(confirmInputPasswordElement, "123456")
  userEvent.click(submitButtonElement)

  const confirmPasswordErrorElemetAgain = screen.queryByText(/the passwords do not match. try again/i)
  expect(confirmPasswordErrorElemetAgain).toBeInTheDocument()
})