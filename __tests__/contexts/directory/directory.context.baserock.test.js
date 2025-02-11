import { describe, it, expect } from '@jest/globals';
import { createContext, React } from 'react';
import { DIRECTORY_DATA } from '../../../src/contexts/directory/directory.data';
import { DirectoryContext } from '../../../src/contexts/directory/directory.context.js';
import { render } from '@testing-library/react';

jest.mock('react', () => {
  const actualReact = jest.requireActual('react');
  return {
    ...actualReact,
    createContext: jest.fn(actualReact.createContext)
  };
});

jest.mock('../../../src/contexts/directory/directory.data', () => ({
  DIRECTORY_DATA: { mockData: 'test' }
}));

describe('DirectoryContext', () => {
  it('should create a context with DIRECTORY_DATA', () => {
    expect(createContext).toHaveBeenCalledWith(DIRECTORY_DATA);
  });

  it('should export the created context', () => {
    expect(DirectoryContext).toBeDefined();
    expect(DirectoryContext.Provider).toBeDefined();
    expect(DirectoryContext.Consumer).toBeDefined();
  });

  it('should use DIRECTORY_DATA as default value', () => {
    const TestComponent = () => {
      const value = React.useContext(DirectoryContext);
      return <div>{JSON.stringify(value)}</div>;
    };

    const { getByText } = render(<TestComponent />);
    expect(getByText(JSON.stringify(DIRECTORY_DATA))).toBeInTheDocument();
  });
});