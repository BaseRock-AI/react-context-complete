import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import StripeCheckoutButton from '../../../src/components/stripe-button/stripe-button.component';

// Mock StripeCheckout component
const mockToken = jest.fn();
jest.mock('react-stripe-checkout', () => {
  return function DummyStripeCheckout(props) {
    return (
      <div data-testid="stripe-checkout">
        <span data-testid="stripe-label">{props.label}</span>
        <span data-testid="stripe-name">{props.name}</span>
        <span data-testid="stripe-description">{props.description}</span>
        <span data-testid="stripe-amount">{props.amount}</span>
        <button onClick={() => props.token(mockToken)} data-testid="token-button">
          Generate Token
        </button>
      </div>
    );
  };
});

describe('StripeCheckoutButton', () => {
  const mockPrice = 50;
  const mockPublishableKey = 'pk_test_WBqax2FWVzS9QlpJScO07iuL';

  beforeEach(() => {
    jest.spyOn(console, 'log').mockImplementation(() => {});
    jest.spyOn(window, 'alert').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders StripeCheckout component with correct props', () => {
    render(<StripeCheckoutButton price={mockPrice} />);

    expect(screen.getByTestId('stripe-checkout')).toBeInTheDocument();
    expect(screen.getByTestId('stripe-label')).toHaveTextContent('Pay Now');
    expect(screen.getByTestId('stripe-name')).toHaveTextContent('CRWN Clothing Ltd.');
    expect(screen.getByTestId('stripe-description')).toHaveTextContent(`Your total is $${mockPrice}`);
    expect(screen.getByTestId('stripe-amount')).toHaveTextContent((mockPrice * 100).toString());
  });

  it('uses the correct publishable key', () => {
    render(<StripeCheckoutButton price={mockPrice} />);
    const stripeCheckout = screen.getByTestId('stripe-checkout');
    expect(stripeCheckout).toHaveAttribute('stripekey', mockPublishableKey);
  });

  it('handles token generation correctly', () => {
    render(<StripeCheckoutButton price={mockPrice} />);
    const tokenButton = screen.getByTestId('token-button');
    tokenButton.click();

    expect(console.log).toHaveBeenCalledWith(mockToken);
    expect(window.alert).toHaveBeenCalledWith('Payment Succesful!');
  });

  it('calculates priceForStripe correctly', () => {
    render(<StripeCheckoutButton price={mockPrice} />);
    const amountElement = screen.getByTestId('stripe-amount');
    expect(amountElement).toHaveTextContent((mockPrice * 100).toString());
  });
});