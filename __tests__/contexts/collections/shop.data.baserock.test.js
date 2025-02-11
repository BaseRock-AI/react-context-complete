import { describe, it, expect } from '@jest/globals';
import SHOP_DATA from '../../../src/contexts/collections/shop.data.js';

describe('SHOP_DATA', () => {
  it('should have the correct categories', () => {
    expect(Object.keys(SHOP_DATA)).toEqual(['hats', 'sneakers', 'jackets', 'womens', 'mens']);
  });

  it('should have the correct structure for each category', () => {
    Object.values(SHOP_DATA).forEach(category => {
      expect(category).toHaveProperty('id');
      expect(category).toHaveProperty('title');
      expect(category).toHaveProperty('routeName');
      expect(category).toHaveProperty('items');
      expect(Array.isArray(category.items)).toBe(true);
    });
  });

  it('should have the correct number of items in each category', () => {
    expect(SHOP_DATA.hats.items.length).toBe(9);
    expect(SHOP_DATA.sneakers.items.length).toBe(8);
    expect(SHOP_DATA.jackets.items.length).toBe(5);
    expect(SHOP_DATA.womens.items.length).toBe(7);
    expect(SHOP_DATA.mens.items.length).toBe(6);
  });

  it('should have unique ids for all items across categories', () => {
    const allItems = Object.values(SHOP_DATA).flatMap(category => category.items);
    const uniqueIds = new Set(allItems.map(item => item.id));
    expect(uniqueIds.size).toBe(allItems.length);
  });

  it('should have the correct properties for each item', () => {
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

  it('should have valid image URLs', () => {
    const urlPattern = /^https:\/\/i\.ibb\.co\/.+\.png$/;
    Object.values(SHOP_DATA).forEach(category => {
      category.items.forEach(item => {
        expect(item.imageUrl).toMatch(urlPattern);
      });
    });
  });

  it('should have prices within a reasonable range', () => {
    Object.values(SHOP_DATA).forEach(category => {
      category.items.forEach(item => {
        expect(item.price).toBeGreaterThan(0);
        expect(item.price).toBeLessThan(1000); // Assuming no item costs $1000 or more
      });
    });
  });
});