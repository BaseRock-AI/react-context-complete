const SHOP_DATA = require('../../../src/contexts/collections/shop.data').default;

describe('SHOP_DATA', () => {
  it('should have all expected categories', () => {
    expect(Object.keys(SHOP_DATA)).toEqual(['hats', 'sneakers', 'jackets', 'womens', 'mens']);
  });

  const categories = ['hats', 'sneakers', 'jackets', 'womens', 'mens'];
  
  categories.forEach(category => {
    describe(category, () => {
      it('should have correct properties', () => {
        expect(SHOP_DATA[category]).toHaveProperty('id');
        expect(SHOP_DATA[category]).toHaveProperty('title');
        expect(SHOP_DATA[category]).toHaveProperty('routeName');
        expect(SHOP_DATA[category]).toHaveProperty('items');
      });

      it('should have items as an array', () => {
        expect(Array.isArray(SHOP_DATA[category].items)).toBe(true);
      });

      it('should have correct item structure', () => {
        SHOP_DATA[category].items.forEach(item => {
          expect(item).toHaveProperty('id');
          expect(item).toHaveProperty('name');
          expect(item).toHaveProperty('imageUrl');
          expect(item).toHaveProperty('price');
        });
      });
    });
  });

  it('should have correct number of items in each category', () => {
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

  it('should have valid image URLs for all items', () => {
    const allItems = Object.values(SHOP_DATA).flatMap(category => category.items);
    allItems.forEach(item => {
      expect(item.imageUrl).toMatch(/^https:\/\/i\.ibb\.co\/.+/);
    });
  });

  it('should have positive prices for all items', () => {
    const allItems = Object.values(SHOP_DATA).flatMap(category => category.items);
    allItems.forEach(item => {
      expect(item.price).toBeGreaterThan(0);
    });
  });
});