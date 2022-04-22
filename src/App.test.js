import { render, screen } from '@testing-library/react';
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