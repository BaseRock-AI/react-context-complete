import { describe, it, expect } from '@jest/globals';
import {
  selectCart,
  selectCartItems,
  selectCartHidden,
  selectCartItemsCount,
  selectCartTotal
} from '../../../src/redux/cart/cart.selectors.js';

describe('Cart Selectors', () => {
  const mockState = {
    cart: {
      cartItems: [
        { id: 1, quantity: 2, price: 10 },
        { id: 2, quantity: 1, price: 20 },
        { id: 3, quantity: 3, price: 15 }
      ],
      hidden: true
    }
  };

  describe('selectCart', () => {
    it('should return the cart state', () => {
      const result = selectCart(mockState);
      expect(result).toEqual(mockState.cart);
    });
  });

  describe('selectCartItems', () => {
    it('should return the cart items', () => {
      const result = selectCartItems(mockState);
      expect(result).toEqual(mockState.cart.cartItems);
    });
  });

  describe('selectCartHidden', () => {
    it('should return the hidden state of the cart', () => {
      const result = selectCartHidden(mockState);
      expect(result).toBe(true);
    });
  });

  describe('selectCartItemsCount', () => {
    it('should return the total quantity of items in the cart', () => {
      const result = selectCartItemsCount(mockState);
      expect(result).toBe(6); // 2 + 1 + 3
    });

    it('should return 0 when cart is empty', () => {
      const emptyState = { cart: { cartItems: [] } };
      const result = selectCartItemsCount(emptyState);
      expect(result).toBe(0);
    });
  });

  describe('selectCartTotal', () => {
    it('should return the total price of items in the cart', () => {
      const result = selectCartTotal(mockState);
      expect(result).toBe(85); // (2 * 10) + (1 * 20) + (3 * 15)
    });

    it('should return 0 when cart is empty', () => {
      const emptyState = { cart: { cartItems: [] } };
      const result = selectCartTotal(emptyState);
      expect(result).toBe(0);
    });
  });
});