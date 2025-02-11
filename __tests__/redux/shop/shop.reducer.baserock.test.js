import { describe, it, expect } from '@jest/globals';
import SHOP_DATA from '../../../src/redux/shop/shop.data';
import shopReducer from '../../../src/redux/shop/shop.reducer';

describe('shopReducer', () => {
  const initialState = {
    collections: SHOP_DATA
  };

  it('should return the initial state', () => {
    expect(shopReducer(undefined, {})).toEqual(initialState);
  });

  it('should handle unknown action types', () => {
    const unknownAction = { type: 'UNKNOWN_ACTION' };
    expect(shopReducer(initialState, unknownAction)).toEqual(initialState);
  });

  it('should not modify state for any action', () => {
    const testAction = { type: 'TEST_ACTION', payload: 'test' };
    const newState = shopReducer(initialState, testAction);
    expect(newState).toBe(initialState);
  });

  it('should maintain collections from SHOP_DATA', () => {
    const state = shopReducer(undefined, {});
    expect(state.collections).toBe(SHOP_DATA);
  });
});