const { addItemToCart, removeItemFromCart, filterItemFromCart, getCartItemsCount, getCartTotal } = require('../../../src/providers/cart/cart.utils');

describe('Cart Utility Functions', () => {
  describe('addItemToCart', () => {
    it('should add a new item to the cart', () => {
      const cartItems = [];
      const newItem = { id: 1, name: 'Test Item', price: 10 };
      const result = addItemToCart(cartItems, newItem);
      expect(result).toEqual([{ ...newItem, quantity: 1 }]);
    });

    it('should increase the quantity of an existing item', () => {
      const cartItems = [{ id: 1, name: 'Test Item', price: 10, quantity: 1 }];
      const itemToAdd = { id: 1, name: 'Test Item', price: 10 };
      const result = addItemToCart(cartItems, itemToAdd);
      expect(result).toEqual([{ id: 1, name: 'Test Item', price: 10, quantity: 2 }]);
    });
  });

  describe('removeItemFromCart', () => {
    it('should decrease the quantity of an existing item', () => {
      const cartItems = [{ id: 1, name: 'Test Item', price: 10, quantity: 2 }];
      const itemToRemove = { id: 1 };
      const result = removeItemFromCart(cartItems, itemToRemove);
      expect(result).toEqual([{ id: 1, name: 'Test Item', price: 10, quantity: 1 }]);
    });

    it('should remove the item when quantity becomes 0', () => {
      const cartItems = [{ id: 1, name: 'Test Item', price: 10, quantity: 1 }];
      const itemToRemove = { id: 1 };
      const result = removeItemFromCart(cartItems, itemToRemove);
      expect(result).toEqual([]);
    });
  });

  describe('filterItemFromCart', () => {
    it('should remove the specified item from the cart', () => {
      const cartItems = [
        { id: 1, name: 'Item 1', price: 10, quantity: 1 },
        { id: 2, name: 'Item 2', price: 20, quantity: 2 }
      ];
      const itemToFilter = { id: 1 };
      const result = filterItemFromCart(cartItems, itemToFilter);
      expect(result).toEqual([{ id: 2, name: 'Item 2', price: 20, quantity: 2 }]);
    });
  });

  describe('getCartItemsCount', () => {
    it('should return the total number of items in the cart', () => {
      const cartItems = [
        { id: 1, quantity: 2 },
        { id: 2, quantity: 3 }
      ];
      const result = getCartItemsCount(cartItems);
      expect(result).toBe(5);
    });

    it('should return 0 for an empty cart', () => {
      const result = getCartItemsCount([]);
      expect(result).toBe(0);
    });
  });

  describe('getCartTotal', () => {
    it('should calculate the total price of items in the cart', () => {
      const cartItems = [
        { id: 1, price: 10, quantity: 2 },
        { id: 2, price: 15, quantity: 3 }
      ];
      const result = getCartTotal(cartItems);
      expect(result).toBe(65); // (10 * 2) + (15 * 3)
    });

    it('should return 0 for an empty cart', () => {
      const result = getCartTotal([]);
      expect(result).toBe(0);
    });
  });
});