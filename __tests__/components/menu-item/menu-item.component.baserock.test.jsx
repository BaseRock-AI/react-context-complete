import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import MenuItem from '../../../src/components/menu-item/menu-item.component.jsx';

// Mock the styles import
jest.mock('../../../src/components/menu-item/menu-item.styles.scss', () => ({}));

// Mock react-router-dom's withRouter HOC
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  withRouter: (Component) => (props) => <Component {...props} />
}));

describe('MenuItem Component', () => {
  const mockProps = {
    title: 'hats',
    imageUrl: 'test-image.jpg',
    size: 'large',
    linkUrl: '/hats',
    history: {
      push: jest.fn(),
    },
    match: {
      url: '',
    },
  };

  const setup = (props = mockProps) => {
    const history = createMemoryHistory();
    return render(
      <Router history={history}>
        <MenuItem {...props} />
      </Router>
    );
  };

  test('renders MenuItem with correct title', () => {
    setup();
    expect(screen.getByText('HATS')).toBeTruthy();
  });

  test('renders MenuItem with correct size class', () => {
    setup();
    const menuItem = screen.getByText('HATS').closest('div');
    expect(menuItem.className).toContain('large');
    expect(menuItem.className).toContain('menu-item');
  });

  test('renders MenuItem with correct background image', () => {
    setup();
    const backgroundDiv = screen.getByText('HATS').parentElement.previousSibling;
    expect(backgroundDiv).toHaveStyle(`background-image: url(test-image.jpg)`);
  });

  test('renders "SHOP NOW" subtitle', () => {
    setup();
    expect(screen.getByText('SHOP NOW')).toBeTruthy();
  });

  test('navigates to correct URL when clicked', () => {
    const pushMock = jest.fn();
    setup({ ...mockProps, history: { push: pushMock } });
    fireEvent.click(screen.getByText('HATS').closest('div'));
    expect(pushMock).toHaveBeenCalledWith('/hats');
  });

  test('handles different title prop', () => {
    setup({ ...mockProps, title: 'jackets' });
    expect(screen.getByText('JACKETS')).toBeTruthy();
  });

  test('handles different size prop', () => {
    setup({ ...mockProps, size: 'small' });
    const menuItem = screen.getByText('HATS').closest('div');
    expect(menuItem.className).toContain('small');
    expect(menuItem.className).toContain('menu-item');
  });
});