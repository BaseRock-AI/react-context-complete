import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { CollectionPage } from '../../../src/pages/collection/collection.component.jsx';
import { CollectionsContext } from '../../../src/contexts/collections/collections.context';

// Mock the CollectionItem component
jest.mock('../../../src/components/collection-item/collection-item.component', () => ({
  __esModule: true,
  default: ({ item }) => <div data-testid="collection-item">{item.name}</div>
}));

describe('CollectionPage', () => {
  const mockCollections = {
    hats: {
      id: 1,
      title: 'Hats',
      items: [
        { id: 1, name: 'Brown Brim' },
        { id: 2, name: 'Blue Beanie' }
      ]
    }
  };

  const mockMatch = {
    params: {
      collectionId: 'hats'
    }
  };

  const renderWithContext = (ui, contextValue) => {
    return render(
      <CollectionsContext.Provider value={contextValue}>
        {ui}
      </CollectionsContext.Provider>
    );
  };

  it('renders the collection title', () => {
    renderWithContext(<CollectionPage match={mockMatch} />, mockCollections);
    expect(screen.getByText('Hats')).toBeInTheDocument();
  });

  it('renders all collection items', () => {
    renderWithContext(<CollectionPage match={mockMatch} />, mockCollections);
    const collectionItems = screen.getAllByTestId('collection-item');
    expect(collectionItems).toHaveLength(2);
    expect(screen.getByText('Brown Brim')).toBeInTheDocument();
    expect(screen.getByText('Blue Beanie')).toBeInTheDocument();
  });

  it('handles non-existent collection gracefully', () => {
    const nonExistentMatch = {
      params: {
        collectionId: 'non-existent'
      }
    };

    console.error = jest.fn(); // Suppress console.error for this test

    renderWithContext(<CollectionPage match={nonExistentMatch} />, mockCollections);

    expect(screen.queryByText('Hats')).not.toBeInTheDocument();
    expect(screen.queryAllByTestId('collection-item')).toHaveLength(0);
  });
});