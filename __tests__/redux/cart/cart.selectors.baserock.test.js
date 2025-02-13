import { describe, it, expect } from '@jest/globals';
import { selectCartItems, selectCartHidden, selectCartItemsCount, selectCartTotal } from '../../../src/redux/cart/cart.selectors';

describe('Cart Selectors', () => {
  const mockState = {
    cart: {
      cartItems: [
        { id: 1, quantity: 2, price: 10 },
        { id: 2, quantity: 1, price: 15 },
      ],
      hidden: true,
    },
  };

  describe('selectCartItems', () => {
    it('should return cart items from state', () => {
      const selected = selectCartItems(mockState);
      expect(selected).toEqual(mockState.cart.cartItems);
    });
  });

  describe('selectCartHidden', () => {
    it('should return cart hidden status from state', () => {
      const selected = selectCartHidden(mockState);
      expect(selected).toBe(true);
    });
  });

  describe('selectCartItemsCount', () => {
    it('should return the total quantity of items in the cart', () => {
      const selected = selectCartItemsCount(mockState);
      expect(selected).toBe(3); // 2 + 1 = 3
    });

    it('should return 0 when cart is empty', () => {
      const emptyState = { cart: { cartItems: [] } };
      const selected = selectCartItemsCount(emptyState);
      expect(selected).toBe(0);
    });
  });

  describe('selectCartTotal', () => {
    it('should return the total price of items in the cart', () => {
      const selected = selectCartTotal(mockState);
      expect(selected).toBe(35); // (2 * 10) + (1 * 15) = 35
    });

    it('should return 0 when cart is empty', () => {
      const emptyState = { cart: { cartItems: [] } };
      const selected = selectCartTotal(emptyState);
      expect(selected).toBe(0);
    });
  });
});