import { jest, describe, it, expect } from '@jest/globals';
import { selectCurrentUser } from '../../../src/redux/user/user.selectors.js';

// Mock the createSelector function
const mockCreateSelector = jest.fn((selectors, resultFunc) => {
  return (state) => {
    const selectedValues = selectors.map(selector => selector(state));
    return resultFunc(...selectedValues);
  };
});

jest.unstable_mockModule('reselect', () => ({
  createSelector: mockCreateSelector
}));

describe('User Selectors', () => {
  describe('selectCurrentUser', () => {
    it('should select the current user from the state', () => {
      const mockState = {
        user: {
          currentUser: { id: 1, name: 'John Doe' }
        }
      };

      const result = selectCurrentUser(mockState);

      expect(result).toEqual({ id: 1, name: 'John Doe' });
    });

    it('should return undefined if there is no current user', () => {
      const mockState = {
        user: {
          currentUser: undefined
        }
      };

      const result = selectCurrentUser(mockState);

      expect(result).toBeUndefined();
    });

    it('should handle null state', () => {
      const mockState = {
        user: null
      };

      const result = selectCurrentUser(mockState);

      expect(result).toBeUndefined();
    });

    it('should handle undefined state', () => {
      const mockState = {};

      const result = selectCurrentUser(mockState);

      expect(result).toBeUndefined();
    });

    it('should memoize the selector', () => {
      const mockState1 = {
        user: {
          currentUser: { id: 1, name: 'John Doe' }
        }
      };

      const mockState2 = {
        user: {
          currentUser: { id: 1, name: 'John Doe' }
        }
      };

      const result1 = selectCurrentUser(mockState1);
      const result2 = selectCurrentUser(mockState2);

      expect(result1).toStrictEqual(result2);
      expect(mockCreateSelector).toHaveBeenCalledTimes(1);
    });
  });
});