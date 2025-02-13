import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter, Route } from 'react-router-dom';
import ShopPage from '../../../src/pages/shop/shop.component';
import CollectionsOverview from '../../../src/components/collections-overview/collections-overview.component';
import CollectionPage from '../../../src/pages/collection/collection.component';

// Mock the child components
jest.mock('../../../src/components/collections-overview/collections-overview.component', () => () => <div data-testid="collections-overview">Collections Overview</div>);
jest.mock('../../../src/pages/collection/collection.component', () => () => <div data-testid="collection-page">Collection Page</div>);

describe('ShopPage', () => {
  it('renders CollectionsOverview for the root shop path', () => {
    const { getByTestId, queryByTestId } = render(
      <MemoryRouter initialEntries={['/shop']}>
        <Route path="/shop">
          <ShopPage match={{ path: '/shop' }} />
        </Route>
      </MemoryRouter>
    );

    expect(getByTestId('collections-overview')).toBeTruthy();
    expect(queryByTestId('collection-page')).toBeNull();
  });

  it('renders CollectionPage for a specific collection path', () => {
    const { getByTestId, queryByTestId } = render(
      <MemoryRouter initialEntries={['/shop/hats']}>
        <Route path="/shop">
          <ShopPage match={{ path: '/shop' }} />
        </Route>
      </MemoryRouter>
    );

    expect(getByTestId('collection-page')).toBeTruthy();
    expect(queryByTestId('collections-overview')).toBeNull();
  });
});