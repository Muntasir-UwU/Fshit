import { render, screen } from '@testing-library/react';
import App from './App';

test('renders pool party header', () => {
  render(<App />);
  const heading = screen.getByText(/pool party/i);
  expect(heading).toBeInTheDocument();
});
