import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { CartContext } from '../../../src/providers/cart/cart.provider';
import CheckoutPage from '../../../src/pages/checkout/checkout.component';

// Mock the child components
jest.mock('../../../src/components/checkout-item/checkout-item.component', () => ({
  __esModule: true,
  default: () => <div data-testid="mock-checkout-item" />
}));

jest.mock('../../../src/components/stripe-button/stripe-button.component', () => ({
  __esModule: true,
  default: ({ price }) => <div data-testid="mock-stripe-button">Price: {price}</div>
}));

describe('CheckoutPage', () => {
  const mockCartItems = [
    { id: 1, name: 'Item 1', price: 10 },
    { id: 2, name: 'Item 2', price: 20 }
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
    const checkoutItems = screen.getAllByTestId('mock-checkout-item');
    expect(checkoutItems).toHaveLength(mockCartItems.length);
  });

  it('displays correct total', () => {
    renderWithContext(mockCartItems, mockCartTotal);
    expect(screen.getByText(`TOTAL: $${mockCartTotal}`)).toBeInTheDocument();
  });

  it('renders test warning message', () => {
    renderWithContext();
    expect(screen.getByText(/Please use the following test credit card for payments/i)).toBeInTheDocument();
    expect(screen.getByText((content, element) => {
      return element.tagName.toLowerCase() === 'div' && 
             element.textContent.includes('4242 4242 4242 4242 - Exp: 01/20 - CVV: 123');
    })).toBeInTheDocument();
  });

  it('renders StripeCheckoutButton with correct price', () => {
    renderWithContext(mockCartItems, mockCartTotal);
    expect(screen.getByTestId('mock-stripe-button')).toHaveTextContent(`Price: ${mockCartTotal}`);
  });

  it('renders empty cart message when no items', () => {
    renderWithContext();
    expect(screen.queryAllByTestId('mock-checkout-item')).toHaveLength(0);
  });
});