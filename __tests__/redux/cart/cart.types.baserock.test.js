import { describe, it, expect } from '@jest/globals';
import CartActionTypes from '../../../src/redux/cart/cart.types.js';

describe('CartActionTypes', () => {
  it('should have TOGGLE_CART_HIDDEN action type', () => {
    expect(CartActionTypes.TOGGLE_CART_HIDDEN).toBe('TOGGLE_CART_HIDDEN');
  });

  it('should have ADD_ITEM action type', () => {
    expect(CartActionTypes.ADD_ITEM).toBe('ADD_ITEM');
  });

  it('should have REMOVE_ITEM action type', () => {
    expect(CartActionTypes.REMOVE_ITEM).toBe('REMOVE_ITEM');
  });

  it('should have CLEAR_ITEM_FROM_CART action type', () => {
    expect(CartActionTypes.CLEAR_ITEM_FROM_CART).toBe('CLEAR_ITEM_FROM_CART');
  });

  it('should have exactly 4 action types', () => {
    expect(Object.keys(CartActionTypes).length).toBe(4);
  });

  it('should not have any additional action types', () => {
    const expectedKeys = ['TOGGLE_CART_HIDDEN', 'ADD_ITEM', 'REMOVE_ITEM', 'CLEAR_ITEM_FROM_CART'];
    expect(Object.keys(CartActionTypes)).toEqual(expect.arrayContaining(expectedKeys));
    expect(Object.keys(CartActionTypes).length).toBe(expectedKeys.length);
  });
});