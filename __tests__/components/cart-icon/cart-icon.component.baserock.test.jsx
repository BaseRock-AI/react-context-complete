import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { CartContext } from '../../../src/providers/cart/cart.provider';
import CartIcon from '../../../src/components/cart-icon/cart-icon.component';

// Mock the SVG import
jest.mock('../../../src/assets/shopping-bag.svg', () => ({
  ReactComponent: () => <div data-testid="shopping-icon" />
}));

describe('CartIcon', () => {
  const mockToggleHidden = jest.fn();
  const mockCartItemsCount = 5;

  const renderCartIcon = (contextValue = {}) => {
    return render(
      <CartContext.Provider value={{ 
        toggleHidden: mockToggleHidden, 
        cartItemsCount: mockCartItemsCount,
        ...contextValue 
      }}>
        <CartIcon />
      </CartContext.Provider>
    );
  };

  it('renders without crashing', () => {
    renderCartIcon();
    expect(screen.getByTestId('shopping-icon')).toBeInTheDocument();
  });

  it('displays the correct item count', () => {
    renderCartIcon();
    expect(screen.getByText('5')).toBeInTheDocument();
  });

  it('calls toggleHidden when clicked', () => {
    renderCartIcon();
    fireEvent.click(screen.getByTestId('shopping-icon'));
    expect(mockToggleHidden).toHaveBeenCalledTimes(1);
  });

  it('updates item count when context changes', () => {
    const { rerender } = renderCartIcon();
    expect(screen.getByText('5')).toBeInTheDocument();

    rerender(
      <CartContext.Provider value={{ 
        toggleHidden: mockToggleHidden, 
        cartItemsCount: 10
      }}>
        <CartIcon />
      </CartContext.Provider>
    );

    expect(screen.getByText('10')).toBeInTheDocument();
  });
});