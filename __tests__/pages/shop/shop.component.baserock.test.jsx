import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route } from 'react-router-dom';
import { ShopPage } from '../../../src/pages/shop/shop.component';
import { CollectionsOverview } from '../../../src/components/collections-overview/collections-overview.component';
import { CollectionPage } from '../../../src/pages/collection/collection.component';

// Mock the child components
jest.mock('../../../src/components/collections-overview/collections-overview.component', () => ({
  CollectionsOverview: () => <div data-testid="collections-overview">Collections Overview</div>
}));

jest.mock('../../../src/pages/collection/collection.component', () => ({
  CollectionPage: () => <div data-testid="collection-page">Collection Page</div>
}));

describe('ShopPage', () => {
  const renderWithRouter = (ui, { route = '/' } = {}) => {
    return render(
      <MemoryRouter initialEntries={[route]}>
        <Route path="/shop">
          {ui}
        </Route>
      </MemoryRouter>
    );
  };

  it('renders CollectionsOverview for the exact path', () => {
    renderWithRouter(<ShopPage match={{ path: '/shop' }} />, { route: '/shop' });
    expect(screen.getByTestId('collections-overview')).toBeInTheDocument();
    expect(screen.queryByTestId('collection-page')).not.toBeInTheDocument();
  });

  it('renders CollectionPage for a specific collection', () => {
    renderWithRouter(<ShopPage match={{ path: '/shop' }} />, { route: '/shop/hats' });
    expect(screen.getByTestId('collection-page')).toBeInTheDocument();
    expect(screen.queryByTestId('collections-overview')).not.toBeInTheDocument();
  });

  it('renders the shop-page div', () => {
    renderWithRouter(<ShopPage match={{ path: '/shop' }} />, { route: '/shop' });
    expect(screen.getByClassName('shop-page')).toBeInTheDocument();
  });
});