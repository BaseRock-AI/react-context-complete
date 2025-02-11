import { describe, it, expect } from '@jest/globals';
import SHOP_DATA from '../../../src/redux/shop/shop.data.js';

describe('SHOP_DATA', () => {
  it('should have all expected categories', () => {
    const expectedCategories = ['hats', 'sneakers', 'jackets', 'womens', 'mens'];
    expect(Object.keys(SHOP_DATA)).toEqual(expectedCategories);
  });

  it('should have correct properties for each category', () => {
    Object.values(SHOP_DATA).forEach(category => {
      expect(category).toHaveProperty('id');
      expect(category).toHaveProperty('title');
      expect(category).toHaveProperty('routeName');
      expect(category).toHaveProperty('items');
      expect(Array.isArray(category.items)).toBe(true);
    });
  });

  it('should have correct number of items in each category', () => {
    expect(SHOP_DATA.hats.items).toHaveLength(9);
    expect(SHOP_DATA.sneakers.items).toHaveLength(8);
    expect(SHOP_DATA.jackets.items).toHaveLength(5);
    expect(SHOP_DATA.womens.items).toHaveLength(7);
    expect(SHOP_DATA.mens.items).toHaveLength(6);
  });

  it('should have correct properties for each item', () => {
    Object.values(SHOP_DATA).forEach(category => {
      category.items.forEach(item => {
        expect(item).toHaveProperty('id');
        expect(item).toHaveProperty('name');
        expect(item).toHaveProperty('imageUrl');
        expect(item).toHaveProperty('price');
        expect(typeof item.id).toBe('number');
        expect(typeof item.name).toBe('string');
        expect(typeof item.imageUrl).toBe('string');
        expect(typeof item.price).toBe('number');
      });
    });
  });

  it('should have unique ids for all items across categories', () => {
    const allItemIds = Object.values(SHOP_DATA).flatMap(category => 
      category.items.map(item => item.id)
    );
    const uniqueItemIds = new Set(allItemIds);
    expect(allItemIds.length).toBe(uniqueItemIds.size);
  });

  it('should have valid image URLs for all items', () => {
    Object.values(SHOP_DATA).forEach(category => {
      category.items.forEach(item => {
        expect(item.imageUrl).toMatch(/^https:\/\/i\.ibb\.co\/.+/);
      });
    });
  });
});