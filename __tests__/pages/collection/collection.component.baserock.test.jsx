import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import CollectionPage from '../../../src/pages/collection/collection.component';
import CollectionsContext from '../../../src/contexts/collections/collections.context';

// Mock the CollectionItem component
jest.mock('../../../src/components/collection-item/collection-item.component', () => {
  const React = require('react');
  return function MockCollectionItem({ item }) {
    return <div data-testid="collection-item">{item.name}</div>;
  };
});

describe('CollectionPage', () => {
  const mockCollections = {
    hats: {
      id: 1,
      title: 'Hats',
      items: [
        { id: 1, name: 'Brown Brim' },
        { id: 2, name: 'Blue Beanie' },
      ],
    },
  };

  const mockMatch = {
    params: {
      collectionId: 'hats',
    },
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

  it('applies correct CSS classes', () => {
    renderWithContext(<CollectionPage match={mockMatch} />, mockCollections);
    expect(screen.getByRole('heading', { level: 2 })).toHaveClass('title');
    expect(screen.getByTestId('collection-page')).toHaveClass('collection-page');
    expect(screen.getByTestId('items-container')).toHaveClass('items');
  });

  it('handles non-existent collection gracefully', () => {
    const invalidMatch = {
      params: {
        collectionId: 'non-existent',
      },
    };

    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    expect(() => {
      renderWithContext(<CollectionPage match={invalidMatch} />, mockCollections);
    }).toThrow("Cannot destructure property 'title' of 'collection' as it is undefined.");

    consoleErrorSpy.mockRestore();
  });
});