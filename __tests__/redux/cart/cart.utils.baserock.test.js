const { addItemToCart, removeItemFromCart } = require('../../../src/redux/cart/cart.utils');

describe('Cart Utility Functions', () => {
  describe('addItemToCart', () => {
    it('should add a new item to an empty cart', () => {
      const cartItems = [];
      const newItem = { id: 1, name: 'Test Item' };
      const result = addItemToCart(cartItems, newItem);
      expect(result).toEqual([{ id: 1, name: 'Test Item', quantity: 1 }]);
    });

    it('should increase quantity of existing item', () => {
      const cartItems = [{ id: 1, name: 'Test Item', quantity: 1 }];
      const itemToAdd = { id: 1, name: 'Test Item' };
      const result = addItemToCart(cartItems, itemToAdd);
      expect(result).toEqual([{ id: 1, name: 'Test Item', quantity: 2 }]);
    });

    it('should add new item without affecting existing items', () => {
      const cartItems = [{ id: 1, name: 'Existing Item', quantity: 1 }];
      const newItem = { id: 2, name: 'New Item' };
      const result = addItemToCart(cartItems, newItem);
      expect(result).toEqual([
        { id: 1, name: 'Existing Item', quantity: 1 },
        { id: 2, name: 'New Item', quantity: 1 }
      ]);
    });
  });

  describe('removeItemFromCart', () => {
    it('should remove the item when quantity is 1', () => {
      const cartItems = [{ id: 1, name: 'Test Item', quantity: 1 }];
      const itemToRemove = { id: 1, name: 'Test Item' };
      const result = removeItemFromCart(cartItems, itemToRemove);
      expect(result).toEqual([]);
    });

    it('should decrease quantity of item when quantity is greater than 1', () => {
      const cartItems = [{ id: 1, name: 'Test Item', quantity: 2 }];
      const itemToRemove = { id: 1, name: 'Test Item' };
      const result = removeItemFromCart(cartItems, itemToRemove);
      expect(result).toEqual([{ id: 1, name: 'Test Item', quantity: 1 }]);
    });

    it('should not affect other items when removing an item', () => {
      const cartItems = [
        { id: 1, name: 'Item 1', quantity: 2 },
        { id: 2, name: 'Item 2', quantity: 1 }
      ];
      const itemToRemove = { id: 1, name: 'Item 1' };
      const result = removeItemFromCart(cartItems, itemToRemove);
      expect(result).toEqual([
        { id: 1, name: 'Item 1', quantity: 1 },
        { id: 2, name: 'Item 2', quantity: 1 }
      ]);
    });

    it('should return the original cart when removing non-existent item', () => {
      const cartItems = [{ id: 1, name: 'Existing Item', quantity: 1 }];
      const nonExistentItem = { id: 2, name: 'Non-existent Item' };
      const result = removeItemFromCart(cartItems, nonExistentItem);
      expect(result).toEqual(cartItems);
    });
  });
});