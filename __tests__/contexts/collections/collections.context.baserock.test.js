import React from 'react';
import { describe, it, expect } from '@jest/globals';
import { useContext } from 'react';
import { render } from '@testing-library/react';
import CollectionsContext from '../../../src/contexts/collections/collections.context.js';
import { SHOP_DATA } from '../../../src/contexts/collections/shop.data';

jest.mock('../../../src/contexts/collections/shop.data', () => ({
  SHOP_DATA: [
    { id: 1, name: 'Hats' },
    { id: 2, name: 'Jackets' },
  ],
}));

describe('CollectionsContext', () => {
  it('should be created with SHOP_DATA as default value', () => {
    const TestComponent = () => {
      const contextValue = useContext(CollectionsContext);
      return <div data-testid="context-value">{JSON.stringify(contextValue)}</div>;
    };

    const { getByTestId } = render(
      <CollectionsContext.Provider value={SHOP_DATA}>
        <TestComponent />
      </CollectionsContext.Provider>
    );

    const contextValueElement = getByTestId('context-value');
    expect(JSON.parse(contextValueElement.textContent)).toEqual(SHOP_DATA);
  });

  it('should export CollectionsContext', () => {
    expect(CollectionsContext).toBeDefined();
    expect(CollectionsContext.Provider).toBeDefined();
    expect(CollectionsContext.Consumer).toBeDefined();
  });
});