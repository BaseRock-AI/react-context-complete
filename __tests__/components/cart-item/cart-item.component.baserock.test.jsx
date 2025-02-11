import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import CartItem from '../../../src/components/cart-item/cart-item.component';

// Mock the scss import
jest.mock('../../../src/components/cart-item/cart-item.styles.scss', () => ({}));

describe('CartItem', () => {
  const mockItem = {
    imageUrl: 'test-image.jpg',
    price: 10,
    name: 'Test Item',
    quantity: 2
  };

  it('renders the item image with correct src and alt', () => {
    render(<CartItem item={mockItem} />);
    const image = screen.getByAltText('item');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', 'test-image.jpg');
  });

  it('displays the item name correctly', () => {
    render(<CartItem item={mockItem} />);
    expect(screen.getByText('Test Item')).toBeInTheDocument();
  });

  it('displays the correct price and quantity', () => {
    render(<CartItem item={mockItem} />);
    expect(screen.getByText('2 x $10')).toBeInTheDocument();
  });

  it('applies the correct CSS classes', () => {
    const { container } = render(<CartItem item={mockItem} />);
    expect(container.firstChild).toHaveClass('cart-item');
    expect(container.querySelector('.item-details')).toBeInTheDocument();
    expect(container.querySelector('.name')).toBeInTheDocument();
    expect(container.querySelector('.price')).toBeInTheDocument();
  });
});