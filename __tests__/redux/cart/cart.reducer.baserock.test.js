import { describe, it, expect } from '@jest/globals';
import CartActionTypes from '../../../src/redux/cart/cart.types';
import { addItemToCart, removeItemFromCart } from '../../../src/redux/cart/cart.utils';
import cartReducer from '../../../src/redux/cart/cart.reducer';

// Mock the cart.utils functions
jest.mock('../../../src/redux/cart/cart.utils', () => ({
  addItemToCart: jest.fn(cartItems => [...cartItems, { id: 'newItem' }]),
  removeItemFromCart: jest.fn(cartItems => cartItems.slice(0, -1)),
}));

describe('cartReducer', () => {
  const initialState = {
    hidden: true,
    cartItems: []
  };

  it('should return the initial state', () => {
    expect(cartReducer(undefined, {})).toEqual(initialState);
  });

  it('should handle TOGGLE_CART_HIDDEN', () => {
    const action = { type: CartActionTypes.TOGGLE_CART_HIDDEN };
    const newState = cartReducer(initialState, action);
    expect(newState.hidden).toBe(false);
  });

  it('should handle ADD_ITEM', () => {
    const mockItem = { id: '123', name: 'Test Item' };
    const action = { type: CartActionTypes.ADD_ITEM, payload: mockItem };
    const newState = cartReducer(initialState, action);
    expect(addItemToCart).toHaveBeenCalledWith([], mockItem);
    expect(newState.cartItems).toEqual([{ id: 'newItem' }]);
  });

  it('should handle REMOVE_ITEM', () => {
    const initialStateWithItems = {
      ...initialState,
      cartItems: [{ id: '1' }, { id: '2' }]
    };
    const mockItem = { id: '2' };
    const action = { type: CartActionTypes.REMOVE_ITEM, payload: mockItem };
    const newState = cartReducer(initialStateWithItems, action);
    expect(removeItemFromCart).toHaveBeenCalledWith(initialStateWithItems.cartItems, mockItem);
    expect(newState.cartItems).toEqual([{ id: '1' }]);
  });

  it('should handle CLEAR_ITEM_FROM_CART', () => {
    const initialStateWithItems = {
      ...initialState,
      cartItems: [{ id: '1' }, { id: '2' }, { id: '3' }]
    };
    const action = { type: CartActionTypes.CLEAR_ITEM_FROM_CART, payload: { id: '2' } };
    const newState = cartReducer(initialStateWithItems, action);
    expect(newState.cartItems).toEqual([{ id: '1' }, { id: '3' }]);
  });
});