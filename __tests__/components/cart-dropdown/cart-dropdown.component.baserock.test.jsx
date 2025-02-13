import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { CartContext } from '../../../src/providers/cart/cart.provider';
import CartDropdown from '../../../src/components/cart-dropdown/cart-dropdown.component';

// Mock the dependencies
jest.mock('../../../src/components/custom-button/custom-button.component', () => {
  return function DummyCustomButton(props) {
    return <button data-testid="custom-button" {...props}>{props.children}</button>;
  };
});

jest.mock('../../../src/components/cart-item/cart-item.component', () => {
  return function DummyCartItem({ item }) {
    return <div data-testid={`cart-item-${item.id}`}>{item.name}</div>;
  };
});

const mockHistoryPush = jest.fn();
jest.mock('react-router-dom', () => ({
  withRouter: (Component) => (props) => <Component {...props} history={{ push: mockHistoryPush }} />,
}));

describe('CartDropdown', () => {
  const mockToggleHidden = jest.fn();

  const renderComponent = (cartItems = []) => {
    return render(
      <CartContext.Provider value={{ cartItems, toggleHidden: mockToggleHidden }}>
        <CartDropdown />
      </CartContext.Provider>
    );
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders empty message when cart is empty', () => {
    renderComponent();
    expect(screen.getByText('Your cart is empty')).toBeInTheDocument();
  });

  it('renders cart items when cart is not empty', () => {
    const mockCartItems = [
      { id: 1, name: 'Item 1' },
      { id: 2, name: 'Item 2' },
    ];
    renderComponent(mockCartItems);
    
    expect(screen.queryByText('Your cart is empty')).not.toBeInTheDocument();
    expect(screen.getByTestId('cart-item-1')).toBeInTheDocument();
    expect(screen.getByTestId('cart-item-2')).toBeInTheDocument();
  });

  it('calls history.push and toggleHidden when checkout button is clicked', () => {
    renderComponent();
    
    const checkoutButton = screen.getByTestId('custom-button');
    fireEvent.click(checkoutButton);

    expect(mockHistoryPush).toHaveBeenCalledWith('/checkout');
    expect(mockToggleHidden).toHaveBeenCalled();
  });

  it('applies correct CSS classes', () => {
    renderComponent();
    
    expect(screen.getByRole('div', { name: /cart-dropdown/i })).toHaveClass('cart-dropdown');
    expect(screen.getByRole('div', { name: /cart-items/i })).toHaveClass('cart-items');
  });
});