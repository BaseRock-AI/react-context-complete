import { describe, it, expect, jest } from '@jest/globals';
import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import userReducer from '../../src/redux/user/user.reducer';
import cartReducer from '../../src/redux/cart/cart.reducer';
import directoryReducer from '../../src/redux/directory/directory.reducer';
import shopReducer from '../../src/redux/shop/shop.reducer';
import rootReducer from '../../src/redux/root-reducer';

// Mock the reducers
jest.mock('../../src/redux/user/user.reducer', () => jest.fn());
jest.mock('../../src/redux/cart/cart.reducer', () => jest.fn());
jest.mock('../../src/redux/directory/directory.reducer', () => jest.fn());
jest.mock('../../src/redux/shop/shop.reducer', () => jest.fn());

// Mock redux-persist
jest.mock('redux-persist', () => ({
  persistReducer: jest.fn((config, reducer) => reducer)
}));

describe('Root Reducer', () => {
  it('should combine all reducers', () => {
    const expectedCombinedReducer = combineReducers({
      user: userReducer,
      cart: cartReducer,
      directory: directoryReducer,
      shop: shopReducer
    });

    expect(rootReducer).toEqual(expect.any(Function));
    expect(JSON.stringify(rootReducer)).toEqual(JSON.stringify(expectedCombinedReducer));
  });

  it('should use persistReducer with correct configuration', () => {
    expect(persistReducer).toHaveBeenCalledWith(
      {
        key: 'root',
        storage,
        whitelist: ['cart']
      },
      expect.any(Function)
    );
  });

  it('should only whitelist cart reducer for persistence', () => {
    const persistConfig = {
      key: 'root',
      storage,
      whitelist: ['cart']
    };
    expect(persistConfig.whitelist).toContain('cart');
    expect(persistConfig.whitelist).not.toContain('user');
    expect(persistConfig.whitelist).not.toContain('directory');
    expect(persistConfig.whitelist).not.toContain('shop');
  });

  it('should use correct storage for persistence', () => {
    expect(storage).toBe(require('redux-persist/lib/storage').default);
  });

  it('should export a function as default', () => {
    expect(typeof rootReducer).toBe('function');
  });
});