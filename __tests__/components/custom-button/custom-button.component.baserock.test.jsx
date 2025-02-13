import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import CustomButton from '../../../src/components/custom-button/custom-button.component';

// Mock the scss import
jest.mock('../../../src/components/custom-button/custom-buttom.styles.scss', () => ({}));

describe('CustomButton', () => {
  it('renders children correctly', () => {
    render(<CustomButton>Test Button</CustomButton>);
    expect(screen.getByText('Test Button')).toBeInTheDocument();
  });

  it('applies default class', () => {
    render(<CustomButton>Default Button</CustomButton>);
    expect(screen.getByText('Default Button')).toHaveClass('custom-button');
  });

  it('applies inverted class when inverted prop is true', () => {
    render(<CustomButton inverted>Inverted Button</CustomButton>);
    const button = screen.getByText('Inverted Button');
    expect(button).toHaveClass('inverted');
    expect(button).toHaveClass('custom-button');
  });

  it('applies google-sign-in class when isGoogleSignIn prop is true', () => {
    render(<CustomButton isGoogleSignIn>Google Sign In</CustomButton>);
    const button = screen.getByText('Google Sign In');
    expect(button).toHaveClass('google-sign-in');
    expect(button).toHaveClass('custom-button');
  });

  it('applies both inverted and google-sign-in classes when both props are true', () => {
    render(<CustomButton inverted isGoogleSignIn>Inverted Google Sign In</CustomButton>);
    const button = screen.getByText('Inverted Google Sign In');
    expect(button).toHaveClass('inverted');
    expect(button).toHaveClass('google-sign-in');
    expect(button).toHaveClass('custom-button');
  });

  it('passes other props to the button element', () => {
    render(<CustomButton data-testid="custom-button" onClick={() => {}}>Test Props</CustomButton>);
    const button = screen.getByTestId('custom-button');
    expect(button).toHaveAttribute('data-testid', 'custom-button');
  });
});