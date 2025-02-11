const { UserActionTypes } = require('../../../src/redux/user/user.types.js');

describe('UserActionTypes', () => {
  it('should have SET_CURRENT_USER action type', () => {
    expect(UserActionTypes.SET_CURRENT_USER).toBeDefined();
    expect(UserActionTypes.SET_CURRENT_USER).toBe('SET_CURRENT_USER');
  });

  it('should only contain SET_CURRENT_USER action type', () => {
    const actionTypes = Object.keys(UserActionTypes);
    expect(actionTypes).toHaveLength(1);
    expect(actionTypes).toContain('SET_CURRENT_USER');
  });

  it('should not be modifiable', () => {
    const originalValue = UserActionTypes.SET_CURRENT_USER;
    UserActionTypes.SET_CURRENT_USER = 'NEW_VALUE';
    expect(UserActionTypes.SET_CURRENT_USER).toBe(originalValue);
  });
});