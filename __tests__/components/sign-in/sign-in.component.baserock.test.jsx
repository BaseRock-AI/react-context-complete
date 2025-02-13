import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import SignIn from '../../../src/components/sign-in/sign-in.component';
import { auth, signInWithGoogle } from '../../../src/firebase/firebase.utils';

jest.mock('../../../src/firebase/firebase.utils', () => ({
  auth: {
    signInWithEmailAndPassword: jest.fn(),
  },
  signInWithGoogle: jest.fn(),
}));

describe('SignIn Component', () => {
  it('renders correctly', () => {
    const { getByText, getByRole } = render(<SignIn />);
    
    expect(getByText('I already have an account')).toBeInTheDocument();
    expect(getByText('Sign in with your email and password')).toBeInTheDocument();
    expect(getByRole('textbox', { name: /email/i })).toBeInTheDocument();
    expect(getByRole('textbox', { name: /password/i })).toBeInTheDocument();
    expect(getByRole('button', { name: /sign in/i })).toBeInTheDocument();
    expect(getByRole('button', { name: /sign in with google/i })).toBeInTheDocument();
  });

  it('updates state on input change', () => {
    const { getByRole } = render(<SignIn />);
    const emailInput = getByRole('textbox', { name: /email/i });
    const passwordInput = getByRole('textbox', { name: /password/i });

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });

    expect(emailInput.value).toBe('test@example.com');
    expect(passwordInput.value).toBe('password123');
  });

  it('calls signInWithEmailAndPassword on form submit', async () => {
    const { getByRole } = render(<SignIn />);
    const emailInput = getByRole('textbox', { name: /email/i });
    const passwordInput = getByRole('textbox', { name: /password/i });
    const submitButton = getByRole('button', { name: /sign in$/i });

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(auth.signInWithEmailAndPassword).toHaveBeenCalledWith('test@example.com', 'password123');
    });
  });

  it('calls signInWithGoogle when Google sign-in button is clicked', () => {
    const { getByRole } = render(<SignIn />);
    const googleSignInButton = getByRole('button', { name: /sign in with google/i });

    fireEvent.click(googleSignInButton);

    expect(signInWithGoogle).toHaveBeenCalled();
  });

  it('clears the form after successful sign-in', async () => {
    auth.signInWithEmailAndPassword.mockResolvedValueOnce();
    const { getByRole } = render(<SignIn />);
    const emailInput = getByRole('textbox', { name: /email/i });
    const passwordInput = getByRole('textbox', { name: /password/i });
    const submitButton = getByRole('button', { name: /sign in$/i });

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(emailInput.value).toBe('');
      expect(passwordInput.value).toBe('');
    });
  });

  it('handles sign-in error', async () => {
    const consoleLogSpy = jest.spyOn(console, 'log').mockImplementation();
    auth.signInWithEmailAndPassword.mockRejectedValueOnce(new Error('Sign-in failed'));
    const { getByRole } = render(<SignIn />);
    const emailInput = getByRole('textbox', { name: /email/i });
    const passwordInput = getByRole('textbox', { name: /password/i });
    const submitButton = getByRole('button', { name: /sign in$/i });

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(consoleLogSpy).toHaveBeenCalledWith(expect.any(Error));
    });

    consoleLogSpy.mockRestore();
  });
});