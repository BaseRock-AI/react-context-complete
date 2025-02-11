import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import CollectionsOverview from '../../../src/components/collections-overview/collections-overview.component';
import { CollectionsContext } from '../../../src/contexts/collections/collections.context';

// Mock the CollectionPreview component
jest.mock('../../../src/components/collection-preview/collection-preview.component', () => ({
  __esModule: true,
  default: ({ title }) => <div data-testid="collection-preview">{title}</div>
}));

// Mock the styles import
jest.mock('../../../src/components/collections-overview/collections-overview.styles.scss', () => ({}));

describe('CollectionsOverview', () => {
  const mockCollectionsMap = {
    hats: { id: 1, title: 'Hats' },
    jackets: { id: 2, title: 'Jackets' },
    sneakers: { id: 3, title: 'Sneakers' }
  };

  const renderWithContext = (collectionsMap) => {
    return render(
      <CollectionsContext.Provider value={collectionsMap}>
        <CollectionsOverview />
      </CollectionsContext.Provider>
    );
  };

  it('renders without crashing', () => {
    renderWithContext(mockCollectionsMap);
    expect(screen.getByTestId('collections-overview')).toBeInTheDocument();
  });

  it('renders the correct number of CollectionPreview components', () => {
    renderWithContext(mockCollectionsMap);
    const previewComponents = screen.getAllByTestId('collection-preview');
    expect(previewComponents).toHaveLength(Object.keys(mockCollectionsMap).length);
  });

  it('passes the correct props to CollectionPreview components', () => {
    renderWithContext(mockCollectionsMap);
    Object.values(mockCollectionsMap).forEach(collection => {
      expect(screen.getByText(collection.title)).toBeInTheDocument();
    });
  });

  it('renders nothing when collectionsMap is empty', () => {
    renderWithContext({});
    expect(screen.queryByTestId('collection-preview')).not.toBeInTheDocument();
  });
});