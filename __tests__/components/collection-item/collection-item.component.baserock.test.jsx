import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import CollectionItem from '../../../src/components/collection-item/collection-item.component';
import { CartContext } from '../../../src/providers/cart/cart.provider';

// Mock the CustomButton component
jest.mock('../../../src/components/custom-button/custom-button.component', () => {
  return function DummyCustomButton({ children, inverted, ...otherProps }) {
    return (
      <button data-testid="custom-button" data-inverted={inverted} {...otherProps}>
        {children}
      </button>
    );
  };
});

describe('CollectionItem', () => {
  const mockItem = {
    id: 1,
    name: 'Test Item',
    price: 10,
    imageUrl: 'http://test-image.com/image.jpg'
  };

  const mockAddItem = jest.fn();

  const renderComponent = (item = mockItem) => {
    return render(
      <CartContext.Provider value={{ addItem: mockAddItem }}>
        <CollectionItem item={item} />
      </CartContext.Provider>
    );
  };

  it('renders the item details correctly', () => {
    renderComponent();

    expect(screen.getByText(mockItem.name)).toBeInTheDocument();
    expect(screen.getByText(mockItem.price.toString())).toBeInTheDocument();
    
    const imageElement = screen.getByTestId('image');
    expect(imageElement).toHaveStyle(`background-image: url(${mockItem.imageUrl})`);
  });

  it('calls addItem with the correct item when "Add to cart" button is clicked', () => {
    renderComponent();

    const addToCartButton = screen.getByTestId('custom-button');
    fireEvent.click(addToCartButton);

    expect(mockAddItem).toHaveBeenCalledWith(mockItem);
  });

  it('renders the "Add to cart" button with correct text', () => {
    renderComponent();

    const addToCartButton = screen.getByTestId('custom-button');
    expect(addToCartButton).toHaveTextContent('Add to cart');
  });

  it('applies the "inverted" prop to the CustomButton', () => {
    renderComponent();

    const addToCartButton = screen.getByTestId('custom-button');
    expect(addToCartButton).toHaveAttribute('data-inverted', 'true');
  });

  it('renders correctly with different item props', () => {
    const newItem = {
      id: 2,
      name: 'Another Item',
      price: 20,
      imageUrl: 'http://test-image.com/another-image.jpg'
    };

    renderComponent(newItem);

    expect(screen.getByText(newItem.name)).toBeInTheDocument();
    expect(screen.getByText(newItem.price.toString())).toBeInTheDocument();
    
    const imageElement = screen.getByTestId('image');
    expect(imageElement).toHaveStyle(`background-image: url(${newItem.imageUrl})`);
  });
});