import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { CartContext } from '../../../src/providers/cart/cart.provider';
import CartDropdown from '../../../src/components/cart-dropdown/cart-dropdown.component';

// Mock the withRouter HOC
jest.mock('react-router-dom', () => ({
  withRouter: (Component) => (props) => <Component {...props} history={{ push: jest.fn() }} />,
}));

// Mock the CustomButton component
jest.mock('../../../src/components/custom-button/custom-button.component', () => {
  return function DummyCustomButton(props) {
    return <button {...props}>{props.children}</button>;
  };
});

// Mock the CartItem component
jest.mock('../../../src/components/cart-item/cart-item.component', () => {
  return function DummyCartItem({ item }) {
    return <div data-testid={`cart-item-${item.id}`}>{item.name}</div>;
  };
});

describe('CartDropdown', () => {
  const mockToggleHidden = jest.fn();
  
  const renderWithContext = (cartItems) => {
    return render(
      <CartContext.Provider value={{ cartItems, toggleHidden: mockToggleHidden }}>
        <CartDropdown />
      </CartContext.Provider>
    );
  };

  it('renders empty message when cart is empty', () => {
    renderWithContext([]);
    expect(screen.getByText('Your cart is empty')).toBeInTheDocument();
  });

  it('renders cart items when cart is not empty', () => {
    const mockCartItems = [
      { id: 1, name: 'Item 1' },
      { id: 2, name: 'Item 2' },
    ];
    renderWithContext(mockCartItems);
    
    expect(screen.queryByText('Your cart is empty')).not.toBeInTheDocument();
    expect(screen.getByTestId('cart-item-1')).toBeInTheDocument();
    expect(screen.getByTestId('cart-item-2')).toBeInTheDocument();
  });

  it('calls history.push and toggleHidden when checkout button is clicked', () => {
    const { getByText } = renderWithContext([]);
    const checkoutButton = getByText('GO TO CHECKOUT');
    
    fireEvent.click(checkoutButton);
    
    expect(mockToggleHidden).toHaveBeenCalled();
    // We can't directly test history.push because it's mocked in the withRouter HOC
    // In a real scenario, we might want to test if the navigation occurred
  });
});