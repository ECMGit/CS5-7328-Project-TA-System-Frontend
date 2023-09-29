import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter, useNavigate } from 'react-router-dom';
import LoginPage from '../pages/login/LoginPage';
import AuthService from "../services/auth";

// Mock the AuthService
jest.mock('../services/auth');

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'), // use actual for all non-hook parts
    useNavigate: jest.fn(),
    }));

describe('<LoginPage />', () => {
  it('should handle successful login', async () => {
    // Setup mock for successful login
    (AuthService.login as jest.Mock).mockResolvedValueOnce({});

    const mockNavigate = jest.fn();
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
    render(
        <MemoryRouter>
        <LoginPage />
      </MemoryRouter>
    );

    // Simulate user interactions
    const usernameInput = screen.getByRole('textbox', { name: /username/i }) as HTMLInputElement;
    fireEvent.change(usernameInput, { target: { value: 'junhaos' } });
    expect(usernameInput.value).toBe('junhaos');

    const passwordInput = screen.getByLabelText(/password/i) as HTMLInputElement;
    fireEvent.change(passwordInput, { target: { value: 'junhaos123' } });
    expect(passwordInput.value).toBe('junhaos123');

    fireEvent.click(screen.getByRole('button'), {name: /login/i});


    // Assert that the navigation has occurred to /home 
    await waitFor(() => {
        expect(mockNavigate).toHaveBeenCalledWith('/home');
    });

  });

  // You can add more tests to handle error scenarios, form validations, etc.
});