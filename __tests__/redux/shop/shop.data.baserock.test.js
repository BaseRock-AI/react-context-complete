import SHOP_DATA from '../../../src/redux/shop/shop.data';

describe('SHOP_DATA', () => {
  it('should have all expected categories', () => {
    expect(Object.keys(SHOP_DATA)).toEqual(['hats', 'sneakers', 'jackets', 'womens', 'mens']);
  });

  describe('each category', () => {
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

        it('should have correct title', () => {
          expect(SHOP_DATA[category].title).toBe(category.charAt(0).toUpperCase() + category.slice(1));
        });

        it('should have correct routeName', () => {
          expect(SHOP_DATA[category].routeName).toBe(category);
        });
      });
    });
  });

  describe('items in each category', () => {
    Object.keys(SHOP_DATA).forEach(category => {
      describe(category, () => {
        SHOP_DATA[category].items.forEach(item => {
          it(`should have correct properties for item ${item.id}`, () => {
            expect(item).toHaveProperty('id');
            expect(item).toHaveProperty('name');
            expect(item).toHaveProperty('imageUrl');
            expect(item).toHaveProperty('price');
          });

          it(`should have valid price for item ${item.id}`, () => {
            expect(typeof item.price).toBe('number');
            expect(item.price).toBeGreaterThan(0);
          });

          it(`should have valid imageUrl for item ${item.id}`, () => {
            expect(typeof item.imageUrl).toBe('string');
            expect(item.imageUrl).toMatch(/^https:\/\/i\.ibb\.co\//);
          });
        });
      });
    });
  });
});