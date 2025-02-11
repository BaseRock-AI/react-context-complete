import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { CartContext } from '../../../src/providers/cart/cart.provider';
import CheckoutItem from '../../../src/components/checkout-item/checkout-item.component';

// Mock the CartContext
const mockCartContext = {
  addItem: jest.fn(),
  removeItem: jest.fn(),
  clearItemFromCart: jest.fn(),
};

const mockCartItem = {
  name: 'Test Item',
  imageUrl: 'test-image.jpg',
  price: 10,
  quantity: 2,
};

describe('CheckoutItem Component', () => {
  beforeEach(() => {
    render(
      <CartContext.Provider value={mockCartContext}>
        <CheckoutItem cartItem={mockCartItem} />
      </CartContext.Provider>
    );
  });

  it('renders the cart item details correctly', () => {
    expect(screen.getByAltText('item')).toHaveAttribute('src', 'test-image.jpg');
    expect(screen.getByText('Test Item')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('10')).toBeInTheDocument();
  });

  it('calls removeItem when left arrow is clicked', () => {
    fireEvent.click(screen.getAllByText('❮')[0]);
    expect(mockCartContext.removeItem).toHaveBeenCalledWith(mockCartItem);
  });

  it('calls addItem when right arrow is clicked', () => {
    fireEvent.click(screen.getAllByText('❯')[0]);
    expect(mockCartContext.addItem).toHaveBeenCalledWith(mockCartItem);
  });

  it('calls clearItemFromCart when remove button is clicked', () => {
    fireEvent.click(screen.getByText('✕'));
    expect(mockCartContext.clearItemFromCart).toHaveBeenCalledWith(mockCartItem);
  });
});