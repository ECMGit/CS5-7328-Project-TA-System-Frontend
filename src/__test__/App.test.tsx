import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';


//write your test cases here
test('find a Login element', () => {
  render(<App />);
  const linkElement = screen.getAllByText(/Login/i)[0];
  expect(linkElement).toBeInTheDocument();
});
