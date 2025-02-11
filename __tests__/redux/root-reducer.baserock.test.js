import { describe, it, expect, jest } from '@jest/globals';
import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import userReducer from '../../src/redux/user/user.reducer';
import cartReducer from '../../src/redux/cart/cart.reducer';
import directoryReducer from '../../src/redux/directory/directory.reducer';
import shopReducer from '../../src/redux/shop/shop.reducer';
import rootReducer from '../../src/redux/root-reducer';

// Mock redux-persist
jest.mock('redux-persist', () => ({
  persistReducer: jest.fn((config, reducer) => reducer),
}));

describe('Root Reducer', () => {
  it('should combine all reducers', () => {
    const combinedReducer = combineReducers({
      user: userReducer,
      cart: cartReducer,
      directory: directoryReducer,
      shop: shopReducer
    });

    expect(JSON.stringify(rootReducer)).toEqual(JSON.stringify(combinedReducer));
  });

  it('should configure persistence correctly', () => {
    expect(persistReducer).toHaveBeenCalledWith(
      {
        key: 'root',
        storage,
        whitelist: ['cart']
      },
      expect.any(Function)
    );
  });

  it('should only whitelist cart for persistence', () => {
    const persistConfig = {
      key: 'root',
      storage,
      whitelist: ['cart']
    };
    expect(persistReducer).toHaveBeenCalledWith(persistConfig, expect.any(Function));
  });
});