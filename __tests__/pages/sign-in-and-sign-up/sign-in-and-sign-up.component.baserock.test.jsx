import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import SignInAndSignUpPage from '../../../src/pages/sign-in-and-sign-up/sign-in-and-sign-up.component';

// Mock the child components
jest.mock('../../../src/components/sign-in/sign-in.component', () => {
  return {
    __esModule: true,
    default: () => <div data-testid="mock-sign-in">SignIn Component</div>
  };
});

jest.mock('../../../src/components/sign-up/sign-up.component', () => {
  return {
    __esModule: true,
    default: () => <div data-testid="mock-sign-up">SignUp Component</div>
  };
});

describe('SignInAndSignUpPage', () => {
  it('renders without crashing', () => {
    render(<SignInAndSignUpPage />);
    expect(screen.getByTestId('mock-sign-in')).toBeInTheDocument();
    expect(screen.getByTestId('mock-sign-up')).toBeInTheDocument();
  });

  it('renders both SignIn and SignUp components', () => {
    render(<SignInAndSignUpPage />);
    expect(screen.getByText('SignIn Component')).toBeInTheDocument();
    expect(screen.getByText('SignUp Component')).toBeInTheDocument();
  });

  it('applies the correct CSS class', () => {
    const { container } = render(<SignInAndSignUpPage />);
    expect(container.firstChild).toHaveClass('sign-in-and-sign-up');
  });
});