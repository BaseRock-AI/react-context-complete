import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { CollectionItem } from '../../../src/components/collection-item/collection-item.component.jsx';
import { CartContext } from '../../../src/providers/cart/cart.provider';
import '../../../src/components/collection-item/collection-item.styles.scss';

// Mock the CustomButton component
jest.mock('../../../src/components/custom-button/custom-button.component', () => ({
  __esModule: true,
  default: ({ children, ...props }) => (
    <button data-testid="custom-button" {...props}>
      {children}
    </button>
  ),
}));

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

  it('renders the component with correct item details', () => {
    renderComponent();

    expect(screen.getByText(mockItem.name)).toBeInTheDocument();
    expect(screen.getByText(mockItem.price.toString())).toBeInTheDocument();
    expect(screen.getByTestId('custom-button')).toHaveTextContent('Add to cart');
  });

  it('renders the image with correct background', () => {
    renderComponent();

    const imageElement = screen.getByTestId('image-container');
    expect(imageElement).toHaveStyle(`background-image: url(${mockItem.imageUrl})`);
  });

  it('calls addItem function when "Add to cart" button is clicked', () => {
    renderComponent();

    const addToCartButton = screen.getByTestId('custom-button');
    fireEvent.click(addToCartButton);

    expect(mockAddItem).toHaveBeenCalledWith(mockItem);
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
    const imageElement = screen.getByTestId('image-container');
    expect(imageElement).toHaveStyle(`background-image: url(${newItem.imageUrl})`);
  });

  it('renders the collection footer with correct class', () => {
    renderComponent();

    const footerElement = screen.getByTestId('collection-footer');
    expect(footerElement).toHaveClass('collection-footer');
  });
});