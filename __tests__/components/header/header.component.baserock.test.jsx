import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import '@testing-library/jest-dom';
import Header from '../../../src/components/header/header.component';
import { CartContext } from '../../../src/providers/cart/cart.provider';
import CurrentUserContext from '../../../src/contexts/current-user/current-user.context';

// Mock the firebase auth
jest.mock('../../../src/firebase/firebase.utils', () => ({
  auth: {
    signOut: jest.fn(),
  },
}));

// Mock the SVG import
jest.mock('../../../src/assets/crown.svg', () => ({
  ReactComponent: () => <div data-testid="mock-logo">Logo</div>,
}));

// Mock CartIcon component
jest.mock('../../../src/components/cart-icon/cart-icon.component', () => () => (
  <div data-testid="cart-icon">Cart Icon</div>
));

// Mock CartDropdown component
jest.mock('../../../src/components/cart-dropdown/cart-dropdown.component', () => () => (
  <div data-testid="cart-dropdown">Cart Dropdown</div>
));

const renderHeader = (currentUser = null, hidden = true) => {
  return render(
    <Router>
      <CurrentUserContext.Provider value={currentUser}>
        <CartContext.Provider value={{ hidden }}>
          <Header />
        </CartContext.Provider>
      </CurrentUserContext.Provider>
    </Router>
  );
};

describe('Header Component', () => {
  it('renders the logo', () => {
    renderHeader();
    expect(screen.getByTestId('mock-logo')).toBeInTheDocument();
  });

  it('renders the shop link', () => {
    renderHeader();
    expect(screen.getAllByText('SHOP')[0]).toBeInTheDocument();
  });

  it('renders the contact link', () => {
    renderHeader();
    expect(screen.getByText('CONTACT')).toBeInTheDocument();
  });

  it('renders sign in link when user is not logged in', () => {
    renderHeader();
    expect(screen.getByText('SIGN IN')).toBeInTheDocument();
  });

  it('renders sign out option when user is logged in', () => {
    renderHeader({ id: '123', name: 'Test User' });
    expect(screen.getByText('SIGN OUT')).toBeInTheDocument();
  });

  it('renders CartIcon', () => {
    renderHeader();
    expect(screen.getByTestId('cart-icon')).toBeInTheDocument();
  });

  it('does not render CartDropdown when hidden is true', () => {
    renderHeader(null, true);
    expect(screen.queryByTestId('cart-dropdown')).not.toBeInTheDocument();
  });

  it('renders CartDropdown when hidden is false', () => {
    renderHeader(null, false);
    expect(screen.getByTestId('cart-dropdown')).toBeInTheDocument();
  });
});