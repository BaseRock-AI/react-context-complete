import React from 'react';
import { render } from '@testing-library/react';
import { describe, it, expect } from '@jest/globals';
import SHOP_DATA from '../../../src/contexts/collections/shop.data';
import CollectionsContext from '../../../src/contexts/collections/collections.context';

describe('CollectionsContext', () => {
  it('should be created with SHOP_DATA as default value', () => {
    const TestComponent = () => {
      const contextValue = React.useContext(CollectionsContext);
      return <div data-testid="test-component">{JSON.stringify(contextValue)}</div>;
    };

    const { getByTestId } = render(<TestComponent />);
    const testComponent = getByTestId('test-component');
    expect(JSON.parse(testComponent.textContent)).toEqual(SHOP_DATA);
  });

  it('should provide SHOP_DATA to consuming components', () => {
    const TestComponent = () => {
      const contextValue = React.useContext(CollectionsContext);
      return <div data-testid="test-component">{JSON.stringify(contextValue)}</div>;
    };

    const { getByTestId } = render(
      <CollectionsContext.Provider value={SHOP_DATA}>
        <TestComponent />
      </CollectionsContext.Provider>
    );

    const testComponent = getByTestId('test-component');
    expect(JSON.parse(testComponent.textContent)).toEqual(SHOP_DATA);
  });
});