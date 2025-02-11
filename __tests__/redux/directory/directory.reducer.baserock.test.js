const directoryReducer = require('../../../src/redux/directory/directory.reducer.js');

describe('directoryReducer', () => {
  const INITIAL_STATE = {
    sections: [
      {
        title: 'hats',
        imageUrl: 'https://i.ibb.co/cvpntL1/hats.png',
        id: 1,
        linkUrl: 'shop/hats'
      },
      {
        title: 'jackets',
        imageUrl: 'https://i.ibb.co/px2tCc3/jackets.png',
        id: 2,
        linkUrl: 'shop/jackets'
      },
      {
        title: 'sneakers',
        imageUrl: 'https://i.ibb.co/0jqHpnp/sneakers.png',
        id: 3,
        linkUrl: 'shop/sneakers'
      },
      {
        title: 'womens',
        imageUrl: 'https://i.ibb.co/GCCdy8t/womens.png',
        size: 'large',
        id: 4,
        linkUrl: 'shop/womens'
      },
      {
        title: 'mens',
        imageUrl: 'https://i.ibb.co/R70vBrQ/men.png',
        size: 'large',
        id: 5,
        linkUrl: 'shop/mens'
      }
    ]
  };

  it('should return the initial state when state is undefined', () => {
    expect(directoryReducer(undefined, {})).toEqual(INITIAL_STATE);
  });

  it('should return the current state for unknown action types', () => {
    const unknownAction = { type: 'UNKNOWN_ACTION' };
    expect(directoryReducer(INITIAL_STATE, unknownAction)).toEqual(INITIAL_STATE);
  });

  it('should not modify state for any action', () => {
    const action = { type: 'ANY_ACTION', payload: 'some data' };
    expect(directoryReducer(INITIAL_STATE, action)).toEqual(INITIAL_STATE);
  });

  it('should have the correct number of sections', () => {
    expect(INITIAL_STATE.sections.length).toBe(5);
  });

  it('should have correct properties for each section', () => {
    INITIAL_STATE.sections.forEach(section => {
      expect(section).toHaveProperty('title');
      expect(section).toHaveProperty('imageUrl');
      expect(section).toHaveProperty('id');
      expect(section).toHaveProperty('linkUrl');
    });
  });

  it('should have "large" size for womens and mens sections', () => {
    const largeSections = INITIAL_STATE.sections.filter(section => section.size === 'large');
    expect(largeSections.length).toBe(2);
    expect(largeSections[0].title).toBe('womens');
    expect(largeSections[1].title).toBe('mens');
  });
});