const { addItemToCart, removeItemFromCart } = require('../../../src/redux/cart/cart.utils.js');

describe('Cart Utility Functions', () => {
  describe('addItemToCart', () => {
    it('should add a new item to an empty cart', () => {
      const cartItems = [];
      const newItem = { id: 1, name: 'Product 1' };
      const result = addItemToCart(cartItems, newItem);
      expect(result).toEqual([{ id: 1, name: 'Product 1', quantity: 1 }]);
    });

    it('should increase the quantity of an existing item', () => {
      const cartItems = [{ id: 1, name: 'Product 1', quantity: 1 }];
      const itemToAdd = { id: 1, name: 'Product 1' };
      const result = addItemToCart(cartItems, itemToAdd);
      expect(result).toEqual([{ id: 1, name: 'Product 1', quantity: 2 }]);
    });

    it('should add a new item to a cart with existing items', () => {
      const cartItems = [{ id: 1, name: 'Product 1', quantity: 1 }];
      const newItem = { id: 2, name: 'Product 2' };
      const result = addItemToCart(cartItems, newItem);
      expect(result).toEqual([
        { id: 1, name: 'Product 1', quantity: 1 },
        { id: 2, name: 'Product 2', quantity: 1 }
      ]);
    });
  });

  describe('removeItemFromCart', () => {
    it('should remove an item when its quantity is 1', () => {
      const cartItems = [{ id: 1, name: 'Product 1', quantity: 1 }];
      const itemToRemove = { id: 1, name: 'Product 1' };
      const result = removeItemFromCart(cartItems, itemToRemove);
      expect(result).toEqual([]);
    });

    it('should decrease the quantity of an item when its quantity is greater than 1', () => {
      const cartItems = [{ id: 1, name: 'Product 1', quantity: 2 }];
      const itemToRemove = { id: 1, name: 'Product 1' };
      const result = removeItemFromCart(cartItems, itemToRemove);
      expect(result).toEqual([{ id: 1, name: 'Product 1', quantity: 1 }]);
    });

    it('should return the original cart if the item to remove does not exist', () => {
      const cartItems = [{ id: 1, name: 'Product 1', quantity: 1 }];
      const itemToRemove = { id: 2, name: 'Product 2' };
      const result = removeItemFromCart(cartItems, itemToRemove);
      expect(result).toEqual(cartItems);
    });

    it('should handle removing from an empty cart', () => {
      const cartItems = [];
      const itemToRemove = { id: 1, name: 'Product 1' };
      const result = removeItemFromCart(cartItems, itemToRemove);
      expect(result).toEqual([]);
    });
  });
});