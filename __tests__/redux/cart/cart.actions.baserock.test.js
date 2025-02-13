import { describe, it, expect } from '@jest/globals';
import CartActionTypes from '../../../src/redux/cart/cart.types';
import { toggleCartHidden, addItem, removeItem, clearItemFromCart } from '../../../src/redux/cart/cart.actions';

describe('Cart Actions', () => {
  describe('toggleCartHidden', () => {
    it('should create an action to toggle cart hidden', () => {
      const expectedAction = {
        type: CartActionTypes.TOGGLE_CART_HIDDEN
      };
      expect(toggleCartHidden()).toEqual(expectedAction);
    });
  });

  describe('addItem', () => {
    it('should create an action to add an item to cart', () => {
      const mockItem = { id: 1, name: 'Test Item' };
      const expectedAction = {
        type: CartActionTypes.ADD_ITEM,
        payload: mockItem
      };
      expect(addItem(mockItem)).toEqual(expectedAction);
    });

    it('should create an action with undefined payload if no item is provided', () => {
      const expectedAction = {
        type: CartActionTypes.ADD_ITEM,
        payload: undefined
      };
      expect(addItem()).toEqual(expectedAction);
    });
  });

  describe('removeItem', () => {
    it('should create an action to remove an item from cart', () => {
      const mockItem = { id: 1, name: 'Test Item' };
      const expectedAction = {
        type: CartActionTypes.REMOVE_ITEM,
        payload: mockItem
      };
      expect(removeItem(mockItem)).toEqual(expectedAction);
    });

    it('should create an action with undefined payload if no item is provided', () => {
      const expectedAction = {
        type: CartActionTypes.REMOVE_ITEM,
        payload: undefined
      };
      expect(removeItem()).toEqual(expectedAction);
    });
  });

  describe('clearItemFromCart', () => {
    it('should create an action to clear an item from cart', () => {
      const mockItem = { id: 1, name: 'Test Item' };
      const expectedAction = {
        type: CartActionTypes.CLEAR_ITEM_FROM_CART,
        payload: mockItem
      };
      expect(clearItemFromCart(mockItem)).toEqual(expectedAction);
    });

    it('should create an action with undefined payload if no item is provided', () => {
      const expectedAction = {
        type: CartActionTypes.CLEAR_ITEM_FROM_CART,
        payload: undefined
      };
      expect(clearItemFromCart()).toEqual(expectedAction);
    });
  });
});