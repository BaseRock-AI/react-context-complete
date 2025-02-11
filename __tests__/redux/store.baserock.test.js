import { describe, it, expect, jest, beforeEach, afterEach } from '@jest/globals';

// Use relative imports as specified
jest.mock('../../src/redux/root-reducer', () => 'mockRootReducer');
jest.mock('redux-logger', () => 'mockLogger');

// Define mock functions outside jest.mock()
const mockCreateStore = jest.fn(() => 'mockStore');
const mockApplyMiddleware = jest.fn((...args) => args);
const mockPersistStore = jest.fn(() => 'mockPersistor');

jest.mock('redux', () => ({
  createStore: mockCreateStore,
  applyMiddleware: mockApplyMiddleware,
}));

jest.mock('redux-persist', () => ({
  persistStore: mockPersistStore,
}));

describe('Redux Store Configuration', () => {
  let originalNodeEnv;
  let storeModule;

  beforeEach(() => {
    originalNodeEnv = process.env.NODE_ENV;
    jest.resetModules();
  });

  afterEach(() => {
    process.env.NODE_ENV = originalNodeEnv;
    jest.clearAllMocks();
  });

  it('should create store with root reducer and middleware', async () => {
    storeModule = await import('../../src/redux/store');
    expect(mockCreateStore).toHaveBeenCalledWith('mockRootReducer', expect.any(Function));
  });

  it('should create persistor with the store', async () => {
    storeModule = await import('../../src/redux/store');
    expect(mockPersistStore).toHaveBeenCalledWith('mockStore');
  });

  it('should not include logger middleware in production', async () => {
    process.env.NODE_ENV = 'production';
    await import('../../src/redux/store');
    expect(mockApplyMiddleware).toHaveBeenCalledWith();
  });

  it('should include logger middleware in development', async () => {
    process.env.NODE_ENV = 'development';
    await import('../../src/redux/store');
    expect(mockApplyMiddleware).toHaveBeenCalledWith('mockLogger');
  });

  it('should export store and persistor', async () => {
    storeModule = await import('../../src/redux/store');
    expect(storeModule.store).toBeDefined();
    expect(storeModule.persistor).toBeDefined();
  });

  it('should export default object with store and persistStore', async () => {
    storeModule = await import('../../src/redux/store');
    expect(storeModule.default).toEqual({
      store: expect.any(Object),
      persistStore: expect.any(Function),
    });
  });
});