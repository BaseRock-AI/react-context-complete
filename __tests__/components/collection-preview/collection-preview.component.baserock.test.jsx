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
  const mockItems = [
    { id: 1, name: 'Item 1' },
    { id: 2, name: 'Item 2' },
    { id: 3, name: 'Item 3' },
    { id: 4, name: 'Item 4' },
    { id: 5, name: 'Item 5' },
  ];

  it('renders the title in uppercase', () => {
    render(<CollectionPreview title="test title" items={mockItems} />);
    expect(screen.getByText('TEST TITLE')).toBeInTheDocument();
  });

  it('renders only the first 4 items', () => {
    render(<CollectionPreview title="test title" items={mockItems} />);
    
    expect(screen.getByTestId('collection-item-1')).toBeInTheDocument();
    expect(screen.getByTestId('collection-item-2')).toBeInTheDocument();
    expect(screen.getByTestId('collection-item-3')).toBeInTheDocument();
    expect(screen.getByTestId('collection-item-4')).toBeInTheDocument();
    expect(screen.queryByTestId('collection-item-5')).not.toBeInTheDocument();
  });

  it('renders correctly with less than 4 items', () => {
    const fewItems = mockItems.slice(0, 2);
    render(<CollectionPreview title="test title" items={fewItems} />);
    
    expect(screen.getByTestId('collection-item-1')).toBeInTheDocument();
    expect(screen.getByTestId('collection-item-2')).toBeInTheDocument();
    expect(screen.queryByTestId('collection-item-3')).not.toBeInTheDocument();
  });

  it('renders no items when the items array is empty', () => {
    render(<CollectionPreview title="test title" items={[]} />);
    
    expect(screen.queryByTestId(/collection-item-/)).not.toBeInTheDocument();
  });
});