import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import StripeCheckoutButton from '../../../src/components/stripe-button/stripe-button.component.jsx';

// Mock StripeCheckout component
jest.mock('react-stripe-checkout', () => {
  const React = require('react');
  return function DummyStripeCheckout(props) {
    return (
      <button onClick={() => props.token({ id: 'mock_token' })}>
        {props.label}
      </button>
    );
  };
});

describe('StripeCheckoutButton', () => {
  const mockPrice = 50;
  const mockConsoleLog = jest.spyOn(console, 'log').mockImplementation(() => {});
  const mockAlert = jest.spyOn(window, 'alert').mockImplementation(() => {});

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly with given price', () => {
    render(<StripeCheckoutButton price={mockPrice} />);
    expect(screen.getByText('Pay Now')).toBeInTheDocument();
  });

  it('calls onToken function when payment is successful', () => {
    render(<StripeCheckoutButton price={mockPrice} />);
    fireEvent.click(screen.getByText('Pay Now'));

    expect(mockConsoleLog).toHaveBeenCalledWith({ id: 'mock_token' });
    expect(mockAlert).toHaveBeenCalledWith('Payment Succesful!');
  });

  it('passes correct props to StripeCheckout component', () => {
    render(<StripeCheckoutButton price={mockPrice} />);
    const button = screen.getByRole('button');

    expect(button).toHaveTextContent('Pay Now');
    expect(button).toBeInTheDocument();
  });
});