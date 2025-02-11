import React from 'react';
import { createContext, useContext, useState, useEffect } from 'react';
import { render } from '@testing-library/react';
import CartProvider, { CartContext } from '../../../src/providers/cart/cart.provider';
import {
  addItemToCart,
  removeItemFromCart,
  filterItemFromCart,
  getCartItemsCount,
  getCartTotal
} from '../../../src/providers/cart/cart.utils';

// Mock the cart utility functions
jest.mock('../../../src/providers/cart/cart.utils', () => ({
  addItemToCart: jest.fn(),
  removeItemFromCart: jest.fn(),
  filterItemFromCart: jest.fn(),
  getCartItemsCount: jest.fn(),
  getCartTotal: jest.fn(),
}));

// Mock React's useState and useEffect
jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useState: jest.fn(),
  useEffect: jest.fn(),
}));

describe('CartProvider', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders children and provides initial context values', () => {
    const mockSetState = jest.fn();
    useState.mockReturnValue([true, mockSetState]);

    const TestComponent = () => {
      const context = useContext(CartContext);
      return <div data-testid="test-component">{JSON.stringify(context)}</div>;
    };

    const { getByTestId } = render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    );

    const testComponent = getByTestId('test-component');
    const contextValue = JSON.parse(testComponent.textContent);

    expect(contextValue.hidden).toBe(true);
    expect(contextValue.cartItems).toEqual([]);
    expect(contextValue.cartItemsCount).toBe(0);
    expect(contextValue.cartTotal).toBe(0);
  });

  it('toggles hidden state', () => {
    let hiddenState = true;
    const setHidden = jest.fn((value) => {
      hiddenState = typeof value === 'function' ? value(hiddenState) : value;
    });
    useState.mockReturnValue([hiddenState, setHidden]);

    const TestComponent = () => {
      const { hidden, toggleHidden } = useContext(CartContext);
      return (
        <div>
          <span data-testid="hidden-state">{hidden.toString()}</span>
          <button onClick={toggleHidden}>Toggle</button>
        </div>
      );
    };

    const { getByTestId, getByText } = render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    );

    expect(getByTestId('hidden-state').textContent).toBe('true');

    getByText('Toggle').click();

    expect(setHidden).toHaveBeenCalled();
    expect(hiddenState).toBe(false);
  });

  it('adds item to cart', () => {
    const mockItem = { id: 1, name: 'Test Item' };
    const mockCartItems = [];
    const setCartItems = jest.fn();
    useState.mockReturnValueOnce([true, jest.fn()]) // hidden state
           .mockReturnValueOnce([mockCartItems, setCartItems]) // cartItems state
           .mockReturnValueOnce([0, jest.fn()]) // cartItemsCount state
           .mockReturnValueOnce([0, jest.fn()]); // cartTotal state

    addItemToCart.mockReturnValue([mockItem]);
    getCartItemsCount.mockReturnValue(1);
    getCartTotal.mockReturnValue(10);

    const TestComponent = () => {
      const { cartItems, addItem } = useContext(CartContext);
      return (
        <div>
          <span data-testid="cart-items">{JSON.stringify(cartItems)}</span>
          <button onClick={() => addItem(mockItem)}>Add Item</button>
        </div>
      );
    };

    const { getByTestId, getByText } = render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    );

    expect(getByTestId('cart-items').textContent).toBe('[]');

    getByText('Add Item').click();

    expect(addItemToCart).toHaveBeenCalledWith(mockCartItems, mockItem);
    expect(setCartItems).toHaveBeenCalledWith([mockItem]);
  });

  // Additional tests for removeItem, clearItemFromCart, and updating cart count and total can be added here
});