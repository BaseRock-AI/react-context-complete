import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import CheckoutPage from '../../../src/pages/checkout/checkout.component';
import { CartContext } from '../../../src/providers/cart/cart.provider';

// Mock the child components
jest.mock('../../../src/components/checkout-item/checkout-item.component', () => {
  return function MockCheckoutItem({ cartItem }) {
    return <div data-testid="checkout-item">{cartItem.id}</div>;
  };
});

jest.mock('../../../src/components/stripe-button/stripe-button.component', () => {
  return function MockStripeCheckoutButton({ price }) {
    return <button data-testid="stripe-button">Pay ${price}</button>;
  };
});

describe('CheckoutPage', () => {
  const mockCartItems = [
    { id: 1, name: 'Item 1', price: 10 },
    { id: 2, name: 'Item 2', price: 20 },
  ];
  const mockCartTotal = 30;

  const renderWithContext = (cartItems = [], cartTotal = 0) => {
    return render(
      <CartContext.Provider value={{ cartItems, cartTotal }}>
        <CheckoutPage />
      </CartContext.Provider>
    );
  };

  it('renders checkout header', () => {
    renderWithContext();
    expect(screen.getByText('Product')).toBeInTheDocument();
    expect(screen.getByText('Description')).toBeInTheDocument();
    expect(screen.getByText('Quantity')).toBeInTheDocument();
    expect(screen.getByText('Price')).toBeInTheDocument();
    expect(screen.getByText('Remove')).toBeInTheDocument();
  });

  it('renders checkout items', () => {
    renderWithContext(mockCartItems, mockCartTotal);
    const checkoutItems = screen.getAllByTestId('checkout-item');
    expect(checkoutItems).toHaveLength(2);
    expect(checkoutItems[0]).toHaveTextContent('1');
    expect(checkoutItems[1]).toHaveTextContent('2');
  });

  it('displays correct total', () => {
    renderWithContext(mockCartItems, mockCartTotal);
    expect(screen.getByText('TOTAL: $30')).toBeInTheDocument();
  });

  it('renders test warning message', () => {
    renderWithContext();
    expect(screen.getByText(/Please use the following test credit card for payments/i)).toBeInTheDocument();
    expect(screen.getByText(/4242 4242 4242 4242 - Exp: 01\/20 - CVV: 123/)).toBeInTheDocument();
  });

  it('renders StripeCheckoutButton with correct price', () => {
    renderWithContext(mockCartItems, mockCartTotal);
    expect(screen.getByTestId('stripe-button')).toHaveTextContent('Pay $30');
  });

  it('renders empty cart message when no items', () => {
    renderWithContext();
    expect(screen.queryAllByTestId('checkout-item')).toHaveLength(0);
    expect(screen.getByText('TOTAL: $0')).toBeInTheDocument();
  });
});