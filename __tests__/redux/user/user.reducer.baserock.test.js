import { describe, it, expect } from '@jest/globals';
import { UserActionTypes } from '../../../src/redux/user/user.types';
import userReducer from '../../../src/redux/user/user.reducer';

describe('userReducer', () => {
  const initialState = {
    currentUser: null
  };

  it('should return the initial state', () => {
    expect(userReducer(undefined, {})).toEqual(initialState);
  });

  it('should handle SET_CURRENT_USER action', () => {
    const user = { id: 1, name: 'John Doe' };
    const action = {
      type: UserActionTypes.SET_CURRENT_USER,
      payload: user
    };
    const expectedState = {
      currentUser: user
    };
    expect(userReducer(initialState, action)).toEqual(expectedState);
  });

  it('should not modify state for unknown action types', () => {
    const action = {
      type: 'UNKNOWN_ACTION',
      payload: { someData: 'test' }
    };
    expect(userReducer(initialState, action)).toEqual(initialState);
  });

  it('should update currentUser when SET_CURRENT_USER is dispatched with null', () => {
    const previousState = {
      currentUser: { id: 1, name: 'John Doe' }
    };
    const action = {
      type: UserActionTypes.SET_CURRENT_USER,
      payload: null
    };
    const expectedState = {
      currentUser: null
    };
    expect(userReducer(previousState, action)).toEqual(expectedState);
  });
});