import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import CollectionsOverview from '../../../src/components/collections-overview/collections-overview.component';
import CollectionsContext from '../../../src/contexts/collections/collections.context';

// Mock the CollectionPreview component
jest.mock('../../../src/components/collection-preview/collection-preview.component', () => {
  const React = require('react');
  return function MockCollectionPreview({ title }) {
    return <div data-testid="collection-preview">{title}</div>;
  };
});

describe('CollectionsOverview', () => {
  const mockCollectionsMap = {
    hats: { id: 1, title: 'Hats' },
    jackets: { id: 2, title: 'Jackets' },
    sneakers: { id: 3, title: 'Sneakers' },
  };

  it('renders without crashing', () => {
    render(
      <CollectionsContext.Provider value={mockCollectionsMap}>
        <CollectionsOverview />
      </CollectionsContext.Provider>
    );
    expect(screen.getByClass('collections-overview')).toBeInTheDocument();
  });

  it('renders the correct number of CollectionPreview components', () => {
    render(
      <CollectionsContext.Provider value={mockCollectionsMap}>
        <CollectionsOverview />
      </CollectionsContext.Provider>
    );
    const collectionPreviews = screen.getAllByTestId('collection-preview');
    expect(collectionPreviews).toHaveLength(Object.keys(mockCollectionsMap).length);
  });

  it('passes the correct props to CollectionPreview components', () => {
    render(
      <CollectionsContext.Provider value={mockCollectionsMap}>
        <CollectionsOverview />
      </CollectionsContext.Provider>
    );
    Object.values(mockCollectionsMap).forEach((collection) => {
      expect(screen.getByText(collection.title)).toBeInTheDocument();
    });
  });

  it('renders empty state when collections map is empty', () => {
    render(
      <CollectionsContext.Provider value={{}}>
        <CollectionsOverview />
      </CollectionsContext.Provider>
    );
    expect(screen.queryByTestId('collection-preview')).not.toBeInTheDocument();
  });

  it('renders correctly with a single collection', () => {
    const singleCollectionMap = {
      hats: { id: 1, title: 'Hats' },
    };
    render(
      <CollectionsContext.Provider value={singleCollectionMap}>
        <CollectionsOverview />
      </CollectionsContext.Provider>
    );
    expect(screen.getAllByTestId('collection-preview')).toHaveLength(1);
    expect(screen.getByText('Hats')).toBeInTheDocument();
  });
});