import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import SignIn from '../../../src/components/sign-in/sign-in.component';
import { auth, signInWithGoogle } from '../../../src/firebase/firebase.utils';

// Mock the dependencies
jest.mock('../../../src/components/form-input/form-input.component', () => ({
  FormInput: ({ handleChange, ...otherProps }) => <input onChange={handleChange} {...otherProps} />
}));

jest.mock('../../../src/components/custom-button/custom-button.component', () => ({
  CustomButton: ({ children, ...otherProps }) => <button {...otherProps}>{children}</button>
}));

jest.mock('../../../src/firebase/firebase.utils', () => ({
  auth: {
    signInWithEmailAndPassword: jest.fn(),
  },
  signInWithGoogle: jest.fn(),
}));

describe('SignIn Component', () => {
  it('renders correctly', () => {
    const { getByText, getByPlaceholderText } = render(<SignIn />);
    
    expect(getByText('I already have an account')).toBeInTheDocument();
    expect(getByText('Sign in with your email and password')).toBeInTheDocument();
    expect(getByPlaceholderText('email')).toBeInTheDocument();
    expect(getByPlaceholderText('password')).toBeInTheDocument();
    expect(getByText('Sign in')).toBeInTheDocument();
    expect(getByText('Sign in with Google')).toBeInTheDocument();
  });

  it('updates state on input change', () => {
    const { getByPlaceholderText } = render(<SignIn />);
    const emailInput = getByPlaceholderText('email');
    const passwordInput = getByPlaceholderText('password');

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });

    expect(emailInput.value).toBe('test@example.com');
    expect(passwordInput.value).toBe('password123');
  });

  it('calls signInWithEmailAndPassword on form submit', async () => {
    const { getByPlaceholderText, getByText } = render(<SignIn />);
    const emailInput = getByPlaceholderText('email');
    const passwordInput = getByPlaceholderText('password');
    const submitButton = getByText('Sign in');

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(auth.signInWithEmailAndPassword).toHaveBeenCalledWith('test@example.com', 'password123');
    });
  });

  it('calls signInWithGoogle when Google sign-in button is clicked', () => {
    const { getByText } = render(<SignIn />);
    const googleSignInButton = getByText('Sign in with Google');

    fireEvent.click(googleSignInButton);

    expect(signInWithGoogle).toHaveBeenCalled();
  });

  it('clears the form after successful sign-in', async () => {
    auth.signInWithEmailAndPassword.mockResolvedValueOnce();
    const { getByPlaceholderText, getByText } = render(<SignIn />);
    const emailInput = getByPlaceholderText('email');
    const passwordInput = getByPlaceholderText('password');
    const submitButton = getByText('Sign in');

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
    auth.signInWithEmailAndPassword.mockRejectedValueOnce(new Error('Invalid credentials'));
    const { getByPlaceholderText, getByText } = render(<SignIn />);
    const emailInput = getByPlaceholderText('email');
    const passwordInput = getByPlaceholderText('password');
    const submitButton = getByText('Sign in');

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(consoleLogSpy).toHaveBeenCalledWith(expect.any(Error));
    });

    consoleLogSpy.mockRestore();
  });
});