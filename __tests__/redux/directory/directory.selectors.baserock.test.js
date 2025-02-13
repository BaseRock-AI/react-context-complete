import { jest } from '@jest/globals';
import { createSelector } from 'reselect';
import { selectDirectorySections } from '../../../src/redux/directory/directory.selectors';

// Mock the createSelector function
jest.mock('reselect', () => ({
  createSelector: jest.fn((selectors, resultFunc) => {
    const memoizedSelector = (state) => resultFunc(...selectors.map(selector => selector(state)));
    memoizedSelector.recomputations = () => 0;
    return memoizedSelector;
  })
}));

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

    it('should return undefined if sections are not defined', () => {
      const mockState = {
        directory: {}
      };

      const result = selectDirectorySections(mockState);

      expect(result).toBeUndefined();
    });

    it('should memoize the result for the same input state', () => {
      const mockState1 = {
        directory: {
          sections: [{ id: 1, title: 'Section 1' }]
        }
      };

      const mockState2 = {
        directory: {
          sections: [{ id: 1, title: 'Section 1' }]
        }
      };

      const result1 = selectDirectorySections(mockState1);
      const result2 = selectDirectorySections(mockState2);

      expect(result1).toBe(result2);
      expect(selectDirectorySections.recomputations()).toBe(1);
    });

    it('should recompute for different input states', () => {
      const mockState1 = {
        directory: {
          sections: [{ id: 1, title: 'Section 1' }]
        }
      };

      const mockState2 = {
        directory: {
          sections: [{ id: 2, title: 'Section 2' }]
        }
      };

      selectDirectorySections(mockState1);
      selectDirectorySections(mockState2);

      expect(selectDirectorySections.recomputations()).toBe(2);
    });
  });
});