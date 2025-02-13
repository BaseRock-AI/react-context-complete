import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Directory from '../../../src/components/directory/directory.component';
import DirectoryContext from '../../../src/contexts/directory/directory.context';

// Mock the MenuItem component
jest.mock('../../../src/components/menu-item/menu-item.component', () => {
  return function MockMenuItem({ title }) {
    return <div data-testid="menu-item">{title}</div>;
  };
});

describe('Directory Component', () => {
  const mockSections = [
    { id: 1, title: 'hats' },
    { id: 2, title: 'jackets' },
    { id: 3, title: 'sneakers' },
  ];

  it('renders without crashing', () => {
    render(
      <DirectoryContext.Provider value={mockSections}>
        <Directory />
      </DirectoryContext.Provider>
    );
    expect(screen.getByClass('directory-menu')).toBeInTheDocument();
  });

  it('renders correct number of MenuItem components', () => {
    render(
      <DirectoryContext.Provider value={mockSections}>
        <Directory />
      </DirectoryContext.Provider>
    );
    const menuItems = screen.getAllByTestId('menu-item');
    expect(menuItems).toHaveLength(mockSections.length);
  });

  it('passes correct props to MenuItem components', () => {
    render(
      <DirectoryContext.Provider value={mockSections}>
        <Directory />
      </DirectoryContext.Provider>
    );
    mockSections.forEach((section) => {
      expect(screen.getByText(section.title)).toBeInTheDocument();
    });
  });

  it('renders empty directory when context is empty', () => {
    render(
      <DirectoryContext.Provider value={[]}>
        <Directory />
      </DirectoryContext.Provider>
    );
    expect(screen.queryByTestId('menu-item')).not.toBeInTheDocument();
  });
});