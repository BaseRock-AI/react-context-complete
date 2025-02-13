import { describe, it, expect } from '@jest/globals';
import { UserActionTypes } from '../../../src/redux/user/user.types';
import userReducer from '../../../src/redux/user/user.reducer';

describe('userReducer', () => {
  it('should return the initial state', () => {
    expect(userReducer(undefined, {})).toEqual({ currentUser: null });
  });

  it('should handle SET_CURRENT_USER', () => {
    const mockUser = { id: 1, name: 'John Doe' };
    const action = {
      type: UserActionTypes.SET_CURRENT_USER,
      payload: mockUser
    };
    expect(userReducer(undefined, action)).toEqual({ currentUser: mockUser });
  });

  it('should return the current state for an unknown action type', () => {
    const initialState = { currentUser: { id: 1, name: 'John Doe' } };
    const action = {
      type: 'UNKNOWN_ACTION',
      payload: { id: 2, name: 'Jane Doe' }
    };
    expect(userReducer(initialState, action)).toEqual(initialState);
  });
});