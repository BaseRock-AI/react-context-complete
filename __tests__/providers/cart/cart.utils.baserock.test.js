import { describe, it, expect } from '@jest/globals';
import {
  addItemToCart,
  removeItemFromCart,
  filterItemFromCart,
  getCartItemsCount,
  getCartTotal
} from '../../../src/providers/cart/cart.utils.js';

describe('Cart Utility Functions', () => {
  describe('addItemToCart', () => {
    it('should add a new item to an empty cart', () => {
      const cartItems = [];
      const newItem = { id: 1, name: 'Test Item', price: 10 };
      const result = addItemToCart(cartItems, newItem);
      expect(result).toEqual([{ ...newItem, quantity: 1 }]);
    });

    it('should increase the quantity of an existing item', () => {
      const cartItems = [{ id: 1, name: 'Test Item', price: 10, quantity: 1 }];
      const newItem = { id: 1, name: 'Test Item', price: 10 };
      const result = addItemToCart(cartItems, newItem);
      expect(result).toEqual([{ id: 1, name: 'Test Item', price: 10, quantity: 2 }]);
    });
  });

  describe('removeItemFromCart', () => {
    it('should remove an item when its quantity is 1', () => {
      const cartItems = [{ id: 1, name: 'Test Item', price: 10, quantity: 1 }];
      const itemToRemove = { id: 1 };
      const result = removeItemFromCart(cartItems, itemToRemove);
      expect(result).toEqual([]);
    });

    it('should decrease the quantity of an item when its quantity is greater than 1', () => {
      const cartItems = [{ id: 1, name: 'Test Item', price: 10, quantity: 2 }];
      const itemToRemove = { id: 1 };
      const result = removeItemFromCart(cartItems, itemToRemove);
      expect(result).toEqual([{ id: 1, name: 'Test Item', price: 10, quantity: 1 }]);
    });
  });

  describe('filterItemFromCart', () => {
    it('should remove all instances of an item from the cart', () => {
      const cartItems = [
        { id: 1, name: 'Item 1', price: 10, quantity: 2 },
        { id: 2, name: 'Item 2', price: 15, quantity: 1 }
      ];
      const itemToFilter = { id: 1 };
      const result = filterItemFromCart(cartItems, itemToFilter);
      expect(result).toEqual([{ id: 2, name: 'Item 2', price: 15, quantity: 1 }]);
    });
  });

  describe('getCartItemsCount', () => {
    it('should return the total number of items in the cart', () => {
      const cartItems = [
        { id: 1, name: 'Item 1', price: 10, quantity: 2 },
        { id: 2, name: 'Item 2', price: 15, quantity: 3 }
      ];
      const result = getCartItemsCount(cartItems);
      expect(result).toBe(5);
    });
  });

  describe('getCartTotal', () => {
    it('should return the total price of all items in the cart', () => {
      const cartItems = [
        { id: 1, name: 'Item 1', price: 10, quantity: 2 },
        { id: 2, name: 'Item 2', price: 15, quantity: 3 }
      ];
      const result = getCartTotal(cartItems);
      expect(result).toBe(65);
    });
  });
});