
// App.test.js
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

describe('Login Page', () => {
  test('renders login form with email and password inputs', () => {
    render(<App />);
    expect(screen.getByPlaceholderText(/email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/password/i)).toBeInTheDocument();
  });

  test('displays an error message when email is invalid', () => {
    render(<App />);
    fireEvent.change(screen.getByPlaceholderText(/email/i), { target: { value: 'invalid-email' } });
    fireEvent.change(screen.getByPlaceholderText(/password/i), { target: { value: 'password123' } });
    fireEvent.click(screen.getByText(/login/i));
    
    expect(screen.getByText(/invalid email address/i)).toBeInTheDocument();
  });

  test('submits form with valid credentials', () => {
    render(<App />);
    fireEvent.change(screen.getByPlaceholderText(/email/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByPlaceholderText(/password/i), { target: { value: 'password123' } });
    fireEvent.click(screen.getByText(/login/i));
    
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  test('shows error on failed login', async () => {
    render(<App />);
    fireEvent.change(screen.getByPlaceholderText(/email/i), { target: { value: 'wrong@example.com' } });
    fireEvent.change(screen.getByPlaceholderText(/password/i), { target: { value: 'wrongpassword' } });
    fireEvent.click(screen.getByText(/login/i));

    const errorMessage = await screen.findByText(/invalid email or password/i);
    expect(errorMessage).toBeInTheDocument();
  });
});
