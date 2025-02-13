import { describe, it, expect } from '@jest/globals';
import shopReducer from '../../../src/redux/shop/shop.reducer';

// Mock the SHOP_DATA import
jest.mock('../../../src/redux/shop/shop.data', () => ({
  __esModule: true,
  default: {
    hats: { id: 1, title: 'Hats', items: [] },
    sneakers: { id: 2, title: 'Sneakers', items: [] }
  }
}));

describe('shopReducer', () => {
  it('should return the initial state', () => {
    const initialState = {
      collections: {
        hats: { id: 1, title: 'Hats', items: [] },
        sneakers: { id: 2, title: 'Sneakers', items: [] }
      }
    };
    expect(shopReducer(undefined, {})).toEqual(initialState);
  });

  it('should handle unknown action types', () => {
    const initialState = {
      collections: {
        hats: { id: 1, title: 'Hats', items: [] },
        sneakers: { id: 2, title: 'Sneakers', items: [] }
      }
    };
    const unknownAction = { type: 'UNKNOWN_ACTION' };
    expect(shopReducer(initialState, unknownAction)).toBe(initialState);
  });
});