import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import CollectionPreview from '../../../src/components/collection-preview/collection-preview.component';

// Mock the CollectionItem component
jest.mock('../../../src/components/collection-item/collection-item.component', () => {
  return function MockCollectionItem({ item }) {
    return <div data-testid={`collection-item-${item.id}`}>{item.name}</div>;
  };
});

describe('CollectionPreview', () => {
  const mockTitle = 'Test Collection';
  const mockItems = [
    { id: 1, name: 'Item 1' },
    { id: 2, name: 'Item 2' },
    { id: 3, name: 'Item 3' },
    { id: 4, name: 'Item 4' },
    { id: 5, name: 'Item 5' },
  ];

  it('renders the title in uppercase', () => {
    render(<CollectionPreview title={mockTitle} items={mockItems} />);
    expect(screen.getByText(mockTitle.toUpperCase())).toBeInTheDocument();
  });

  it('renders only the first 4 items', () => {
    render(<CollectionPreview title={mockTitle} items={mockItems} />);
    
    // Check that the first 4 items are rendered
    for (let i = 1; i <= 4; i++) {
      expect(screen.getByTestId(`collection-item-${i}`)).toBeInTheDocument();
    }
    
    // Check that the 5th item is not rendered
    expect(screen.queryByTestId('collection-item-5')).not.toBeInTheDocument();
  });

  it('renders correctly with less than 4 items', () => {
    const fewItems = mockItems.slice(0, 2);
    render(<CollectionPreview title={mockTitle} items={fewItems} />);
    
    expect(screen.getByTestId('collection-item-1')).toBeInTheDocument();
    expect(screen.getByTestId('collection-item-2')).toBeInTheDocument();
    expect(screen.queryByTestId('collection-item-3')).not.toBeInTheDocument();
  });

  it('renders no items when the items array is empty', () => {
    render(<CollectionPreview title={mockTitle} items={[]} />);
    
    const previewElement = screen.getByRole('heading', { name: mockTitle.toUpperCase() }).nextElementSibling;
    expect(previewElement).toBeEmptyDOMElement();
  });
});