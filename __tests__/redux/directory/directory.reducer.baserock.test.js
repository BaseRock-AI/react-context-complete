import directoryReducer from '../../../src/redux/directory/directory.reducer';

describe('directoryReducer', () => {
  const initialState = {
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

  it('should return the initial state', () => {
    expect(directoryReducer(undefined, {})).toEqual(initialState);
  });

  it('should handle unknown action types', () => {
    const unknownAction = { type: 'UNKNOWN_ACTION' };
    expect(directoryReducer(initialState, unknownAction)).toEqual(initialState);
  });

  it('should not modify state for unknown actions', () => {
    const unknownAction = { type: 'UNKNOWN_ACTION' };
    const newState = directoryReducer(initialState, unknownAction);
    expect(newState).toEqual(initialState);
    expect(newState).toBe(initialState);
  });
});