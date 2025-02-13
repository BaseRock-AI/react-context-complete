import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import SignUp from '../../../src/components/sign-up/sign-up.component';
import { auth, createUserProfileDocument } from '../../../src/firebase/firebase.utils';

// Mock dependencies
jest.mock('../../../src/components/form-input/form-input.component', () => {
  return function DummyFormInput(props) {
    return <input data-testid={props.name} {...props} />;
  };
});

jest.mock('../../../src/components/custom-button/custom-button.component', () => {
  return function DummyCustomButton(props) {
    return <button {...props} />;
  };
});

jest.mock('../../../src/firebase/firebase.utils', () => ({
  auth: {
    createUserWithEmailAndPassword: jest.fn()
  },
  createUserProfileDocument: jest.fn()
}));

describe('SignUp Component', () => {
  it('renders correctly', () => {
    const { getByText, getByTestId } = render(<SignUp />);
    
    expect(getByText('I do not have a account')).toBeInTheDocument();
    expect(getByText('Sign up with your email and password')).toBeInTheDocument();
    expect(getByTestId('displayName')).toBeInTheDocument();
    expect(getByTestId('email')).toBeInTheDocument();
    expect(getByTestId('password')).toBeInTheDocument();
    expect(getByTestId('confirmPassword')).toBeInTheDocument();
    expect(getByText('SIGN UP')).toBeInTheDocument();
  });

  it('updates state on input change', () => {
    const { getByTestId } = render(<SignUp />);
    const displayNameInput = getByTestId('displayName');
    
    fireEvent.change(displayNameInput, { target: { value: 'John Doe' } });
    expect(displayNameInput.value).toBe('John Doe');
  });

  it('shows alert when passwords do not match', () => {
    const alertMock = jest.spyOn(window, 'alert').mockImplementation(() => {});
    const { getByTestId, getByText } = render(<SignUp />);
    const passwordInput = getByTestId('password');
    const confirmPasswordInput = getByTestId('confirmPassword');
    const submitButton = getByText('SIGN UP');

    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.change(confirmPasswordInput, { target: { value: 'password321' } });
    fireEvent.change(getByTestId('email'), { target: { value: 'test@example.com' } });
    fireEvent.change(getByTestId('displayName'), { target: { value: 'Test User' } });
    
    fireEvent.submit(submitButton);

    expect(alertMock).toHaveBeenCalledWith("passwords don't match");
    alertMock.mockRestore();
  });

  it('calls createUserWithEmailAndPassword and createUserProfileDocument on successful submission', async () => {
    const mockUser = { uid: '123' };
    auth.createUserWithEmailAndPassword.mockResolvedValue({ user: mockUser });
    createUserProfileDocument.mockResolvedValue();

    const { getByTestId, getByText } = render(<SignUp />);
    
    fireEvent.change(getByTestId('displayName'), { target: { value: 'John Doe' } });
    fireEvent.change(getByTestId('email'), { target: { value: 'john@example.com' } });
    fireEvent.change(getByTestId('password'), { target: { value: 'password123' } });
    fireEvent.change(getByTestId('confirmPassword'), { target: { value: 'password123' } });

    fireEvent.click(getByText('SIGN UP'));

    await waitFor(() => {
      expect(auth.createUserWithEmailAndPassword).toHaveBeenCalledWith('john@example.com', 'password123');
      expect(createUserProfileDocument).toHaveBeenCalledWith(mockUser, { displayName: 'John Doe' });
    });
  });

  it('handles error during sign up', async () => {
    const mockError = new Error('Sign up failed');
    auth.createUserWithEmailAndPassword.mockRejectedValue(mockError);

    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    const { getByTestId, getByText } = render(<SignUp />);
    
    fireEvent.change(getByTestId('displayName'), { target: { value: 'John Doe' } });
    fireEvent.change(getByTestId('email'), { target: { value: 'john@example.com' } });
    fireEvent.change(getByTestId('password'), { target: { value: 'password123' } });
    fireEvent.change(getByTestId('confirmPassword'), { target: { value: 'password123' } });

    fireEvent.click(getByText('SIGN UP'));

    await waitFor(() => {
      expect(consoleSpy).toHaveBeenCalledWith(mockError);
    });

    consoleSpy.mockRestore();
  });
});