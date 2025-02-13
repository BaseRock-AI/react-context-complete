import DIRECTORY_DATA from '../../../src/contexts/directory/directory.data';

describe('DIRECTORY_DATA', () => {
  it('should be an array', () => {
    expect(Array.isArray(DIRECTORY_DATA)).toBe(true);
  });

  it('should contain 5 items', () => {
    expect(DIRECTORY_DATA.length).toBe(5);
  });

  it('should have correct properties for each item', () => {
    DIRECTORY_DATA.forEach(item => {
      expect(item).toHaveProperty('title');
      expect(item).toHaveProperty('imageUrl');
      expect(item).toHaveProperty('id');
      expect(item).toHaveProperty('linkUrl');
    });
  });

  it('should have correct data for "hats" item', () => {
    const hatsItem = DIRECTORY_DATA.find(item => item.title === 'hats');
    expect(hatsItem).toEqual({
      title: 'hats',
      imageUrl: 'https://i.ibb.co/cvpntL1/hats.png',
      id: 1,
      linkUrl: 'shop/hats'
    });
  });

  it('should have "size" property only for "womens" and "mens" items', () => {
    const itemsWithSize = DIRECTORY_DATA.filter(item => 'size' in item);
    expect(itemsWithSize.length).toBe(2);
    expect(itemsWithSize[0].title).toBe('womens');
    expect(itemsWithSize[1].title).toBe('mens');
    expect(itemsWithSize[0].size).toBe('large');
    expect(itemsWithSize[1].size).toBe('large');
  });

  it('should have unique ids for each item', () => {
    const ids = DIRECTORY_DATA.map(item => item.id);
    const uniqueIds = new Set(ids);
    expect(uniqueIds.size).toBe(DIRECTORY_DATA.length);
  });

  it('should have valid imageUrl for each item', () => {
    DIRECTORY_DATA.forEach(item => {
      expect(item.imageUrl).toMatch(/^https:\/\/i\.ibb\.co\/.+\.png$/);
    });
  });

  it('should have correct linkUrl format for each item', () => {
    DIRECTORY_DATA.forEach(item => {
      expect(item.linkUrl).toMatch(/^shop\/.+$/);
    });
  });
});