import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event'

import App from './App';

beforeEach(() => {
  render(<App />)
})

const typeIntoForm = ({ email, password, confirmPassword }) => {
  const inputEmailElement = screen.getByRole('textbox', {
    name: /email/i
  });
  const inputPasswordElement = screen.getByLabelText("Password");
  const confirmInputPasswordElement = screen.getByLabelText(/confirm password/i);

  if (email) {
    userEvent.type(inputEmailElement, email)
  }

  if (password) {
    userEvent.type(inputPasswordElement, password)
  }

  if (confirmPassword) {
    userEvent.type(confirmInputPasswordElement, confirmPassword)
  }

  return {
    inputEmailElement,
    inputPasswordElement,
    confirmInputPasswordElement
  }
}

const clickOnSubmitButton = () => {
  const submitButtonElement = screen.getByRole('button', {
    name: /submit/i
  })

  userEvent.click(submitButtonElement)
}

describe('App', () => {
  test('inputs should initially empty', () => {
    const inputEmailElement = screen.getByRole('textbox');
    const inputPasswordElement = screen.getByLabelText("Password");
    const confirmInputPasswordElement = screen.getByLabelText(/confirm password/i);
  
    expect(inputEmailElement.value).toBe('');
    expect(inputPasswordElement.value).toBe('');
    expect(confirmInputPasswordElement.value).toBe('');
  })
  
  test('should be able to type an email', () => {
    const { inputEmailElement } = typeIntoForm({ email: 'dubstr1@gmail.com' })
    expect(inputEmailElement.value).toBe('dubstr1@gmail.com')
  })
  
  test('should be able to type a password', () => {
    const { inputPasswordElement } = typeIntoForm({ password: 'password!' })
    expect(inputPasswordElement.value).toBe('password!')
  })
  
  test('should be able to type a confirm password', () => {
    const { confirmInputPasswordElement } = typeIntoForm({ confirmPassword: 'password!' })
    expect(confirmInputPasswordElement.value).toBe('password!')
  })
  
  describe('Error handling', () => {
    test('shod show email error message or invalid email', () => {
      typeIntoForm({ email: 'dubstr1gmail.com' })
    
      expect(screen.queryByText(/the email you input is invalid/i)).not.toBeInTheDocument();
    
      clickOnSubmitButton()
    
      expect(screen.queryByText(/the email you input is invalid/i)).toBeInTheDocument()
    })
    
    test('should show password error if password is less than 5 characters', () => {
      expect(screen.queryByText(/the password you entered should contain 5 or more characters/i)).not.toBeInTheDocument();
    
      typeIntoForm({ email: 'dubstr1@gmail.com', password: '123'})
    
      clickOnSubmitButton()
    
      expect(screen.queryByText(/the password you entered should contain 5 or more characters/i)).toBeInTheDocument()
    })
    
    test('should show confirm password error if password do not match', () => {
      typeIntoForm({ email: 'dubstr1@gmail.com', password: '12345' })
    
      expect(screen.queryByText(/the passwords do not match. try again/i)).not.toBeInTheDocument();
    
      typeIntoForm({ confirmPassword: '123456' })
    
      clickOnSubmitButton()
    
      expect(screen.queryByText(/the passwords do not match. try again/i)).toBeInTheDocument()
    })
    
    test('should show no error message if every input is valid', () => {
      typeIntoForm({ email: 'dubstr@1gmail.com', password: '12345', confirmPassword: '12345'})
      clickOnSubmitButton()
    
      expect(screen.queryByText(/the password you entered should contain 5 or more characters/i)).not.toBeInTheDocument()
      expect(screen.queryByText(/the passwords do not match. try again/i)).not.toBeInTheDocument()
      expect(screen.queryByText(/the email you input is invalid/i)).not.toBeInTheDocument()
    })
  })
})