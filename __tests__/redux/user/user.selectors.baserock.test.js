import { describe, it, expect } from '@jest/globals';
import { selectCurrentUser } from '../../../src/redux/user/user.selectors';

// Mock the reselect module
jest.mock('reselect', () => ({
  createSelector: jest.fn((selectors, resultFunc) => {
    return (state) => resultFunc(...selectors.map(selector => selector(state)));
  })
}));

describe('user selectors', () => {
  it('should create selectCurrentUser selector', () => {
    expect(selectCurrentUser).toBeDefined();
    expect(typeof selectCurrentUser).toBe('function');
  });

  it('should select the current user from state', () => {
    const mockState = {
      user: {
        currentUser: { id: 1, name: 'John Doe' }
      }
    };
    const result = selectCurrentUser(mockState);
    expect(result).toEqual({ id: 1, name: 'John Doe' });
  });

  it('should return null if there is no current user', () => {
    const mockState = {
      user: {
        currentUser: null
      }
    };
    const result = selectCurrentUser(mockState);
    expect(result).toBeNull();
  });

  it('should handle empty state', () => {
    const mockState = {};
    const result = selectCurrentUser(mockState);
    expect(result).toBeUndefined();
  });

  it('should handle state with empty user object', () => {
    const mockState = { user: {} };
    const result = selectCurrentUser(mockState);
    expect(result).toBeUndefined();
  });
});