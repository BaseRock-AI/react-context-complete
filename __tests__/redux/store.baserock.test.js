import { describe, it, expect, jest, beforeEach, afterEach } from '@jest/globals';
import { createStore, applyMiddleware } from 'redux';
import { persistStore } from 'redux-persist';
import logger from 'redux-logger';
import rootReducer from '../../src/redux/root-reducer';

// Mock the dependencies
jest.mock('redux', () => ({
  createStore: jest.fn(() => ({})),
  applyMiddleware: jest.fn((...args) => args),
}));
jest.mock('redux-persist', () => ({
  persistStore: jest.fn(() => ({})),
}));
jest.mock('redux-logger', () => jest.fn());
jest.mock('../../src/redux/root-reducer', () => ({}));

// Import the module under test
import store, { persistor } from '../../src/redux/store';

describe('Redux Store', () => {
  const originalEnv = process.env.NODE_ENV;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterEach(() => {
    process.env.NODE_ENV = originalEnv;
  });

  it('should create store with root reducer and middleware', () => {
    expect(createStore).toHaveBeenCalledTimes(1);
    expect(createStore).toHaveBeenCalledWith(rootReducer, expect.any(Function));
    expect(applyMiddleware).toHaveBeenCalledTimes(1);
  });

  it('should not include logger middleware in production', () => {
    process.env.NODE_ENV = 'production';
    jest.isolateModules(() => {
      require('../../src/redux/store');
    });
    expect(applyMiddleware).toHaveBeenCalledWith();
  });

  it('should include logger middleware in development', () => {
    process.env.NODE_ENV = 'development';
    jest.isolateModules(() => {
      require('../../src/redux/store');
    });
    expect(applyMiddleware).toHaveBeenCalledWith(logger);
  });

  it('should create persistor with the store', () => {
    expect(persistStore).toHaveBeenCalledTimes(1);
    expect(persistStore).toHaveBeenCalledWith(store);
  });

  it('should export store and persistor', () => {
    expect(store).toBeDefined();
    expect(persistor).toBeDefined();
  });

  it('should export default object with store and persistStore', () => {
    expect(storeModule).toEqual({ store, persistStore });
  });
});