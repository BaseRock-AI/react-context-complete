import { describe, it, expect } from '@jest/globals';
import { createSelector } from 'reselect';
import {
  selectCollections,
  selectCollectionsForPreview,
  selectCollection
} from '../../../src/redux/shop/shop.selectors.js';

// Mock createSelector
jest.mock('reselect', () => ({
  createSelector: jest.fn((inputSelectors, resultFunc) => {
    return (...args) => resultFunc(...inputSelectors.map(selector => selector(...args)));
  })
}));

describe('Shop Selectors', () => {
  const mockState = {
    shop: {
      collections: {
        hats: { id: 1, title: 'Hats' },
        sneakers: { id: 2, title: 'Sneakers' }
      }
    }
  };

  describe('selectCollections', () => {
    it('should return the collections object from the state', () => {
      const result = selectCollections(mockState);
      expect(result).toEqual(mockState.shop.collections);
    });
  });

  describe('selectCollectionsForPreview', () => {
    it('should return an array of collections', () => {
      const result = selectCollectionsForPreview(mockState);
      expect(Array.isArray(result)).toBe(true);
      expect(result).toHaveLength(2);
      expect(result).toEqual([
        { id: 1, title: 'Hats' },
        { id: 2, title: 'Sneakers' }
      ]);
    });

    it('should return an empty array if collections is empty', () => {
      const emptyState = { shop: { collections: {} } };
      const result = selectCollectionsForPreview(emptyState);
      expect(result).toEqual([]);
    });
  });

  describe('selectCollection', () => {
    it('should return the correct collection for the given URL parameter', () => {
      const collectionUrlParam = 'hats';
      const collectionSelector = selectCollection(collectionUrlParam);
      const result = collectionSelector(mockState);
      expect(result).toEqual({ id: 1, title: 'Hats' });
    });

    it('should return undefined for a non-existent collection', () => {
      const collectionUrlParam = 'non-existent';
      const collectionSelector = selectCollection(collectionUrlParam);
      const result = collectionSelector(mockState);
      expect(result).toBeUndefined();
    });
  });
});