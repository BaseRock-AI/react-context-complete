import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import MenuItem from '../../../src/components/menu-item/menu-item.component';
import '../../../src/components/menu-item/menu-item.styles.scss';

// Mock react-router-dom
jest.mock('react-router-dom', () => ({
  withRouter: (Component) => (props) => <Component {...props} />
}));

describe('MenuItem Component', () => {
  const mockProps = {
    title: 'Test Title',
    imageUrl: 'test-image.jpg',
    size: 'large',
    history: { push: jest.fn() },
    linkUrl: '/test-link',
    match: { url: '/current' }
  };

  it('renders correctly with given props', () => {
    render(<MenuItem {...mockProps} />);
    
    expect(screen.getByText('TEST TITLE')).toBeInTheDocument();
    expect(screen.getByText('SHOP NOW')).toBeInTheDocument();
    expect(screen.getByRole('heading')).toHaveTextContent('TEST TITLE');
    
    const menuItem = screen.getByTestId('menu-item');
    expect(menuItem).toHaveClass('large');
    expect(menuItem).toHaveClass('menu-item');
  });

  it('applies background image style', () => {
    render(<MenuItem {...mockProps} />);
    
    const backgroundImage = screen.getByTestId('background-image');
    expect(backgroundImage).toHaveStyle(`background-image: url(${mockProps.imageUrl})`);
  });

  it('calls history.push with correct URL when clicked', () => {
    render(<MenuItem {...mockProps} />);
    
    const menuItem = screen.getByTestId('menu-item');
    fireEvent.click(menuItem);
    
    expect(mockProps.history.push).toHaveBeenCalledWith('/current/test-link');
  });

  it('renders without size class when size prop is not provided', () => {
    const propsWithoutSize = { ...mockProps, size: undefined };
    render(<MenuItem {...propsWithoutSize} />);
    
    const menuItem = screen.getByTestId('menu-item');
    expect(menuItem).not.toHaveClass('large');
    expect(menuItem).toHaveClass('menu-item');
  });
});