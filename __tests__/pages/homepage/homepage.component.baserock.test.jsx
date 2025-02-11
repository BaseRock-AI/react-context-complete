import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import HomePage from '../../../src/pages/homepage/homepage.component';

// Mock the Directory component
jest.mock('../../../src/components/directory/directory.component', () => {
  return {
    __esModule: true,
    default: () => <div data-testid="mock-directory">Mock Directory</div>
  };
});

describe('HomePage Component', () => {
  it('renders without crashing', () => {
    render(<HomePage />);
    expect(screen.getByTestId('mock-directory')).toBeInTheDocument();
  });

  it('has the correct class name', () => {
    const { container } = render(<HomePage />);
    expect(container.firstChild).toHaveClass('homepage');
  });

  it('contains the Directory component', () => {
    render(<HomePage />);
    const directoryElement = screen.getByTestId('mock-directory');
    expect(directoryElement).toBeInTheDocument();
    expect(directoryElement).toHaveTextContent('Mock Directory');
  });
});