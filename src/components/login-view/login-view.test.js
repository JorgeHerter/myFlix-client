import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { LoginView } from './LoginView'; // Adjust the import based on your file structure

// Mock the fetch function
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ user: { username: 'testUser' }, token: 'testToken' }),
  })
);

afterEach(() => {
  jest.clearAllMocks(); // Clear mocks after each test
});

describe('LoginView', () => {
  const mockOnLoggedIn = jest.fn();

  it('renders LoginView correctly', () => {
    render(<LoginView onLoggedIn={mockOnLoggedIn} />);
    expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /log in/i })).toBeInTheDocument();
  });

  it('submits the form and logs in successfully', async () => {
    render(<LoginView onLoggedIn={mockOnLoggedIn} />);

    fireEvent.change(screen.getByLabelText(/username/i), { target: { value: 'testUser' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'password123' } });

    fireEvent.click(screen.getByRole('button', { name: /log in/i }));

    await waitFor(() => {
      expect(mockOnLoggedIn).toHaveBeenCalledWith(
        { username: 'testUser' }, // user object
        'testToken'               // token
      );
    });
  });

  it('displays loading state when logging in', async () => {
    render(<LoginView onLoggedIn={mockOnLoggedIn} />);

    fireEvent.change(screen.getByLabelText(/username/i), { target: { value: 'testUser' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'password123' } });

    fireEvent.click(screen.getByRole('button', { name: /log in/i }));

    expect(screen.getByRole('button', { name: /logging in.../i })).toBeInTheDocument();
  });

  it('shows an error message when login fails', async () => {
    // Override fetch to simulate a failed login
    global.fetch.mockImplementationOnce(() =>
      Promise.resolve({
        json: () => Promise.resolve({}), // No user or token in response
      })
    );

    render(<LoginView onLoggedIn={mockOnLoggedIn} />);

    fireEvent.change(screen.getByLabelText(/username/i), { target: { value: 'wrongUser' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'wrongPassword' } });

    fireEvent.click(screen.getByRole('button', { name: /log in/i }));

    await waitFor(() => {
      expect(screen.getByText(/invalid username or password/i)).toBeInTheDocument();
    });
  });

  it('shows an error message on network failure', async () => {
    // Override fetch to simulate a network error
    global.fetch.mockImplementationOnce(() =>
      Promise.reject(new Error('Network error'))
    );

    render(<LoginView onLoggedIn={mockOnLoggedIn} />);

    fireEvent.change(screen.getByLabelText(/username/i), { target: { value: 'testUser' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'password123' } });

    fireEvent.click(screen.getByRole('button', { name: /log in/i }));

    await waitFor(() => {
      expect(screen.getByText(/something went wrong. please try again./i)).toBeInTheDocument();
    });
  });
});
