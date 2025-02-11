import { describe, it, expect } from '@jest/globals';
import React from 'react';
import { render } from '@testing-library/react';
import CurrentUserContext from '../../../src/contexts/current-user/current-user.context.js';

describe('CurrentUserContext', () => {
  it('should be created with undefined as the default value', () => {
    expect(CurrentUserContext._currentValue).toBeUndefined();
  });

  it('should provide undefined value when used without a provider', () => {
    const TestComponent = () => {
      const currentUser = React.useContext(CurrentUserContext);
      return <div data-testid="result">{JSON.stringify(currentUser)}</div>;
    };

    const { getByTestId } = render(<TestComponent />);
    expect(getByTestId('result').textContent).toBe('undefined');
  });
});