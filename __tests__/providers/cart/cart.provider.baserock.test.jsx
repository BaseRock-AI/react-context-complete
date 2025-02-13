import React from 'react';
import { render, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import CartProvider, { CartContext } from '../../../src/providers/cart/cart.provider';
import { addItemToCart, removeItemFromCart, filterItemFromCart, getCartItemsCount, getCartTotal } from '../../../src/providers/cart/cart.utils';

// Mock the cart utility functions
jest.mock('../../../src/providers/cart/cart.utils', () => ({
  addItemToCart: jest.fn(),
  removeItemFromCart: jest.fn(),
  filterItemFromCart: jest.fn(),
  getCartItemsCount: jest.fn(),
  getCartTotal: jest.fn(),
}));

describe('CartProvider', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render children and provide initial context values', () => {
    const TestComponent = () => {
      const context = React.useContext(CartContext);
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

  it('should toggle hidden state when toggleHidden is called', () => {
    const TestComponent = () => {
      const { hidden, toggleHidden } = React.useContext(CartContext);
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

    act(() => {
      getByText('Toggle').click();
    });

    expect(getByTestId('hidden-state').textContent).toBe('false');
  });

  it('should add item to cart when addItem is called', () => {
    const mockItem = { id: 1, name: 'Test Item' };
    addItemToCart.mockReturnValue([mockItem]);
    getCartItemsCount.mockReturnValue(1);
    getCartTotal.mockReturnValue(10);

    const TestComponent = () => {
      const { cartItems, addItem } = React.useContext(CartContext);
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

    act(() => {
      getByText('Add Item').click();
    });

    expect(getByTestId('cart-items').textContent).toBe(JSON.stringify([mockItem]));
    expect(addItemToCart).toHaveBeenCalledWith([], mockItem);
  });

  it('should remove item from cart when removeItem is called', () => {
    const mockItem = { id: 1, name: 'Test Item' };
    removeItemFromCart.mockReturnValue([]);
    getCartItemsCount.mockReturnValue(0);
    getCartTotal.mockReturnValue(0);

    const TestComponent = () => {
      const { cartItems, removeItem } = React.useContext(CartContext);
      return (
        <div>
          <span data-testid="cart-items">{JSON.stringify(cartItems)}</span>
          <button onClick={() => removeItem(mockItem)}>Remove Item</button>
        </div>
      );
    };

    const { getByTestId, getByText } = render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    );

    act(() => {
      getByText('Remove Item').click();
    });

    expect(getByTestId('cart-items').textContent).toBe('[]');
    expect(removeItemFromCart).toHaveBeenCalledWith([], mockItem);
  });

  it('should clear item from cart when clearItemFromCart is called', () => {
    const mockItem = { id: 1, name: 'Test Item' };
    filterItemFromCart.mockReturnValue([]);
    getCartItemsCount.mockReturnValue(0);
    getCartTotal.mockReturnValue(0);

    const TestComponent = () => {
      const { cartItems, clearItemFromCart } = React.useContext(CartContext);
      return (
        <div>
          <span data-testid="cart-items">{JSON.stringify(cartItems)}</span>
          <button onClick={() => clearItemFromCart(mockItem)}>Clear Item</button>
        </div>
      );
    };

    const { getByTestId, getByText } = render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    );

    act(() => {
      getByText('Clear Item').click();
    });

    expect(getByTestId('cart-items').textContent).toBe('[]');
    expect(filterItemFromCart).toHaveBeenCalledWith([], mockItem);
  });

  it('should update cartItemsCount and cartTotal when cartItems change', () => {
    const mockItems = [{ id: 1, name: 'Test Item', price: 10 }];
    addItemToCart.mockReturnValue(mockItems);
    getCartItemsCount.mockReturnValue(1);
    getCartTotal.mockReturnValue(10);

    const TestComponent = () => {
      const { cartItems, cartItemsCount, cartTotal, addItem } = React.useContext(CartContext);
      return (
        <div>
          <span data-testid="cart-items">{JSON.stringify(cartItems)}</span>
          <span data-testid="cart-count">{cartItemsCount}</span>
          <span data-testid="cart-total">{cartTotal}</span>
          <button onClick={() => addItem(mockItems[0])}>Add Item</button>
        </div>
      );
    };

    const { getByTestId, getByText } = render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    );

    act(() => {
      getByText('Add Item').click();
    });

    expect(getByTestId('cart-items').textContent).toBe(JSON.stringify(mockItems));
    expect(getByTestId('cart-count').textContent).toBe('1');
    expect(getByTestId('cart-total').textContent).toBe('10');
  });
});