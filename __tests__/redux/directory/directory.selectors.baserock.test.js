import { jest } from '@jest/globals';
import { createSelector } from 'reselect';

// Mock the reselect module
jest.mock('reselect', () => ({
  createSelector: jest.fn((selectors, resultFunc) => {
    return (state) => resultFunc(...selectors.map(selector => selector(state)));
  })
}));

// Import the selector we want to test
import { selectDirectorySections } from '../../../src/redux/directory/directory.selectors.js';

describe('directory selectors', () => {
  describe('selectDirectorySections', () => {
    it('should select the sections from the directory state', () => {
      const mockState = {
        directory: {
          sections: [
            { id: 1, title: 'Section 1' },
            { id: 2, title: 'Section 2' }
          ]
        }
      };

      const result = selectDirectorySections(mockState);

      expect(result).toEqual(mockState.directory.sections);
    });

    it('should return an empty array if sections are not defined', () => {
      const mockState = {
        directory: {}
      };

      const result = selectDirectorySections(mockState);

      expect(result).toEqual(undefined);
    });

    it('should memoize the result for repeated calls with the same state', () => {
      const mockState = {
        directory: {
          sections: [
            { id: 1, title: 'Section 1' },
            { id: 2, title: 'Section 2' }
          ]
        }
      };

      const result1 = selectDirectorySections(mockState);
      const result2 = selectDirectorySections(mockState);

      expect(result1).toBe(result2);
    });
  });
});