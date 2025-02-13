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

  it('renders CartItem component correctly', () => {
    render(<CartItem item={mockItem} />);

    // Check if the image is rendered with correct src and alt
    const image = screen.getByAltText('item');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', 'test-image.jpg');

    // Check if the item name is rendered
    expect(screen.getByText('Test Item')).toBeInTheDocument();

    // Check if the price and quantity are rendered correctly
    expect(screen.getByText('2 x $10')).toBeInTheDocument();
  });

  it('renders CartItem with different props', () => {
    const newMockItem = {
      imageUrl: 'another-image.jpg',
      price: 15.99,
      name: 'Another Test Item',
      quantity: 3
    };

    render(<CartItem item={newMockItem} />);

    // Check if the image is rendered with correct src
    const image = screen.getByAltText('item');
    expect(image).toHaveAttribute('src', 'another-image.jpg');

    // Check if the new item name is rendered
    expect(screen.getByText('Another Test Item')).toBeInTheDocument();

    // Check if the new price and quantity are rendered correctly
    expect(screen.getByText('3 x $15.99')).toBeInTheDocument();
  });
});