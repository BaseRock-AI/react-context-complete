import React from 'react';
import { render } from '@testing-library/react';
import { describe, it, expect } from '@jest/globals';
import DIRECTORY_DATA from '../../../src/contexts/directory/directory.data';
import DirectoryContext from '../../../src/contexts/directory/directory.context';

describe('DirectoryContext', () => {
  it('should be created with the correct default value', () => {
    const TestComponent = () => {
      const contextValue = React.useContext(DirectoryContext);
      return <div data-testid="context-value">{JSON.stringify(contextValue)}</div>;
    };

    const { getByTestId } = render(<TestComponent />);
    const contextValueElement = getByTestId('context-value');
    
    expect(JSON.parse(contextValueElement.textContent)).toEqual(DIRECTORY_DATA);
  });

  it('should provide the correct value to consumers', () => {
    const TestConsumer = () => (
      <DirectoryContext.Consumer>
        {value => <div data-testid="consumer-value">{JSON.stringify(value)}</div>}
      </DirectoryContext.Consumer>
    );

    const { getByTestId } = render(<TestConsumer />);
    const consumerValueElement = getByTestId('consumer-value');
    
    expect(JSON.parse(consumerValueElement.textContent)).toEqual(DIRECTORY_DATA);
  });
});