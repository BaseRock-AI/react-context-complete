import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import '@testing-library/jest-dom';
import Header from '../../../src/components/header/header.component';
import { CurrentUserContext } from '../../../src/contexts/current-user/current-user.context';
import { CartContext } from '../../../src/providers/cart/cart.provider';

// Mock the firebase auth
jest.mock('../../../src/firebase/firebase.utils', () => ({
  auth: {
    signOut: jest.fn(),
  },
}));

// Mock the CartIcon and CartDropdown components
jest.mock('../../../src/components/cart-icon/cart-icon.component', () => () => <div data-testid="cart-icon" />);
jest.mock('../../../src/components/cart-dropdown/cart-dropdown.component', () => () => <div data-testid="cart-dropdown" />);

// Mock the SVG import
jest.mock('../../../src/assets/crown.svg', () => ({
  ReactComponent: () => <div data-testid="logo" />,
}));

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
    expect(screen.getByTestId('logo')).toBeInTheDocument();
    expect(screen.getByTestId('logo').closest('a')).toHaveClass('logo-container');
  });

  it('renders the shop link', () => {
    renderHeader();
    const shopLinks = screen.getAllByRole('link', { name: 'SHOP' });
    expect(shopLinks.length).toBe(2);
    expect(shopLinks[0]).toHaveClass('option');
  });

  it('renders the contact link', () => {
    renderHeader();
    const contactLink = screen.getAllByRole('link', { name: 'SHOP' })[1];
    expect(contactLink).toHaveClass('option');
  });

  it('renders sign in link when user is not authenticated', () => {
    renderHeader();
    expect(screen.getByRole('link', { name: 'SIGN IN' })).toBeInTheDocument();
  });

  it('renders sign out option when user is authenticated', () => {
    renderHeader({ id: '1', name: 'Test User' });
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