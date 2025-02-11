import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import SignUp from '../../../src/components/sign-up/sign-up.component';
import { auth, createUserProfileDocument } from '../../../src/firebase/firebase.utils';

// Mock the dependencies
jest.mock('../../../src/components/form-input/form-input.component', () => ({
  __esModule: true,
  default: ({ handleChange, label, ...otherProps }) => (
    <div>
      <label>{label}</label>
      <input onChange={handleChange} {...otherProps} />
    </div>
  ),
}));

jest.mock('../../../src/components/custom-button/custom-button.component', () => ({
  __esModule: true,
  default: ({ children, ...otherProps }) => <button {...otherProps}>{children}</button>,
}));

jest.mock('../../../src/firebase/firebase.utils', () => ({
  auth: {
    createUserWithEmailAndPassword: jest.fn(),
  },
  createUserProfileDocument: jest.fn(),
}));

describe('SignUp Component', () => {
  it('renders correctly', () => {
    const { getByText, getByRole } = render(<SignUp />);
    
    expect(getByText('I do not have a account')).toBeInTheDocument();
    expect(getByText('Sign up with your email and password')).toBeInTheDocument();
    expect(getByRole('textbox', { name: /display name/i })).toBeInTheDocument();
    expect(getByRole('textbox', { name: /email/i })).toBeInTheDocument();
    expect(getByRole('button', { name: /sign up/i })).toBeInTheDocument();
  });

  it('updates state on input change', () => {
    const { getByRole } = render(<SignUp />);
    const displayNameInput = getByRole('textbox', { name: /display name/i });
    
    fireEvent.change(displayNameInput, { target: { value: 'John Doe' } });
    expect(displayNameInput.value).toBe('John Doe');
  });

  it('shows alert when passwords do not match', () => {
    const { getByRole, getByLabelText } = render(<SignUp />);
    const passwordInput = getByLabelText('Password');
    const confirmPasswordInput = getByLabelText('Confirm Password');
    const submitButton = getByRole('button', { name: /sign up/i });

    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.change(confirmPasswordInput, { target: { value: 'password321' } });

    const alertMock = jest.spyOn(window, 'alert').mockImplementation(() => {});
    
    fireEvent.click(submitButton);

    expect(alertMock).toHaveBeenCalledWith("passwords don't match");
    alertMock.mockRestore();
  });

  it('calls createUserWithEmailAndPassword and createUserProfileDocument on successful submission', async () => {
    const mockUser = { uid: '123' };
    auth.createUserWithEmailAndPassword.mockResolvedValue({ user: mockUser });
    createUserProfileDocument.mockResolvedValue();

    const { getByRole, getByLabelText } = render(<SignUp />);
    
    fireEvent.change(getByRole('textbox', { name: /display name/i }), { target: { value: 'John Doe' } });
    fireEvent.change(getByRole('textbox', { name: /email/i }), { target: { value: 'john@example.com' } });
    fireEvent.change(getByLabelText('Password'), { target: { value: 'password123' } });
    fireEvent.change(getByLabelText('Confirm Password'), { target: { value: 'password123' } });

    fireEvent.click(getByRole('button', { name: /sign up/i }));

    await waitFor(() => {
      expect(auth.createUserWithEmailAndPassword).toHaveBeenCalledWith('john@example.com', 'password123');
      expect(createUserProfileDocument).toHaveBeenCalledWith(mockUser, { displayName: 'John Doe' });
    });
  });

  it('handles error during sign up', async () => {
    const mockError = new Error('Sign up failed');
    auth.createUserWithEmailAndPassword.mockRejectedValue(mockError);

    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    const { getByRole, getByLabelText } = render(<SignUp />);
    
    fireEvent.change(getByRole('textbox', { name: /display name/i }), { target: { value: 'John Doe' } });
    fireEvent.change(getByRole('textbox', { name: /email/i }), { target: { value: 'john@example.com' } });
    fireEvent.change(getByLabelText('Password'), { target: { value: 'password123' } });
    fireEvent.change(getByLabelText('Confirm Password'), { target: { value: 'password123' } });

    fireEvent.click(getByRole('button', { name: /sign up/i }));

    await waitFor(() => {
      expect(consoleSpy).toHaveBeenCalledWith(mockError);
    });

    consoleSpy.mockRestore();
  });
});