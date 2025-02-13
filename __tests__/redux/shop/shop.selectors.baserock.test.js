import { describe, it, expect } from '@jest/globals';
import { selectCollections, selectCollectionsForPreview, selectCollection } from '../../../src/redux/shop/shop.selectors';

// Mock the state
const mockState = {
  shop: {
    collections: {
      hats: { id: 1, title: 'Hats', items: [] },
      sneakers: { id: 2, title: 'Sneakers', items: [] },
    },
  },
};

describe('Shop Selectors', () => {
  describe('selectCollections', () => {
    it('should return the collections object from the state', () => {
      const result = selectCollections(mockState);
      expect(result).toEqual(mockState.shop.collections);
    });

    it('should return undefined if collections is undefined', () => {
      const emptyState = { shop: {} };
      const result = selectCollections(emptyState);
      expect(result).toBeUndefined();
    });
  });

  describe('selectCollectionsForPreview', () => {
    it('should return an array of collections', () => {
      const result = selectCollectionsForPreview(mockState);
      expect(Array.isArray(result)).toBe(true);
      expect(result).toHaveLength(2);
      expect(result[0]).toEqual(mockState.shop.collections.hats);
      expect(result[1]).toEqual(mockState.shop.collections.sneakers);
    });

    it('should return an empty array if collections is undefined', () => {
      const emptyState = { shop: {} };
      const result = selectCollectionsForPreview(emptyState);
      expect(result).toEqual([]);
    });
  });

  describe('selectCollection', () => {
    it('should return the correct collection for a given URL parameter', () => {
      const selectHats = selectCollection('hats');
      const result = selectHats(mockState);
      expect(result).toEqual(mockState.shop.collections.hats);
    });

    it('should return undefined for a non-existent collection', () => {
      const selectNonExistent = selectCollection('non-existent');
      const result = selectNonExistent(mockState);
      expect(result).toBeUndefined();
    });
  });
});