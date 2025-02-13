import { describe, it, expect } from '@jest/globals';
import { UserActionTypes } from '../../../src/redux/user/user.types';
import { setCurrentUser } from '../../../src/redux/user/user.actions';

describe('setCurrentUser action creator', () => {
  it('should create an action with the correct type', () => {
    const user = { id: 1, name: 'John Doe' };
    const action = setCurrentUser(user);
    expect(action.type).toBe(UserActionTypes.SET_CURRENT_USER);
  });

  it('should create an action with the user as payload', () => {
    const user = { id: 1, name: 'John Doe' };
    const action = setCurrentUser(user);
    expect(action.payload).toEqual(user);
  });

  it('should create an action with null payload when no user is provided', () => {
    const action = setCurrentUser(null);
    expect(action.payload).toBeNull();
  });

  it('should create an action with undefined payload when no argument is passed', () => {
    const action = setCurrentUser();
    expect(action.payload).toBeUndefined();
  });
});