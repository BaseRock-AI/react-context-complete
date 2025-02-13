import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import FormInput from '../../../src/components/form-input/form-input.component';

// Mock the scss import
jest.mock('../../../src/components/form-input/form-input.styles.scss', () => ({}));

describe('FormInput Component', () => {
  it('renders input element', () => {
    render(<FormInput />);
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('renders label when provided', () => {
    render(<FormInput label="Email" value="" />);
    expect(screen.getByText('Email')).toBeInTheDocument();
  });

  it('does not render label when not provided', () => {
    render(<FormInput />);
    expect(screen.queryByRole('label')).not.toBeInTheDocument();
  });

  it('applies shrink class to label when input has value', () => {
    render(<FormInput label="Email" value="test@example.com" />);
    const label = screen.getByText('Email');
    expect(label).toHaveClass('shrink');
    expect(label).toHaveClass('form-input-label');
  });

  it('does not apply shrink class to label when input is empty', () => {
    render(<FormInput label="Email" value="" />);
    const label = screen.getByText('Email');
    expect(label).not.toHaveClass('shrink');
    expect(label).toHaveClass('form-input-label');
  });

  it('calls handleChange when input value changes', () => {
    const handleChange = jest.fn();
    render(<FormInput handleChange={handleChange} />);
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'new value' } });
    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it('passes other props to input element', () => {
    render(<FormInput placeholder="Enter email" type="email" required />);
    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('placeholder', 'Enter email');
    expect(input).toHaveAttribute('type', 'email');
    expect(input).toBeRequired();
  });
});