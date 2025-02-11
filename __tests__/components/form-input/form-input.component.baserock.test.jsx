import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import FormInput from '../../../src/components/form-input/form-input.component';

// Mock the SCSS import
jest.mock('../../../src/components/form-input/form-input.styles.scss', () => ({}));

describe('FormInput', () => {
  it('renders input element', () => {
    const { getByRole } = render(<FormInput />);
    expect(getByRole('textbox')).toBeInTheDocument();
  });

  it('applies className to input', () => {
    const { getByRole } = render(<FormInput />);
    expect(getByRole('textbox')).toHaveClass('form-input');
  });

  it('passes otherProps to input', () => {
    const { getByRole } = render(<FormInput type="email" placeholder="Enter email" />);
    const input = getByRole('textbox');
    expect(input).toHaveAttribute('type', 'email');
    expect(input).toHaveAttribute('placeholder', 'Enter email');
  });

  it('calls handleChange when input value changes', () => {
    const handleChange = jest.fn();
    const { getByRole } = render(<FormInput handleChange={handleChange} />);
    const input = getByRole('textbox');
    fireEvent.change(input, { target: { value: 'test' } });
    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it('renders label when label prop is provided', () => {
    const { getByText } = render(<FormInput label="Email" value="" />);
    expect(getByText('Email')).toBeInTheDocument();
  });

  it('does not render label when label prop is not provided', () => {
    const { queryByText } = render(<FormInput />);
    expect(queryByText(/./)).not.toBeInTheDocument();
  });

  it('applies shrink class to label when input has value', () => {
    const { getByText } = render(<FormInput label="Email" value="test@example.com" />);
    expect(getByText('Email')).toHaveClass('shrink');
  });

  it('does not apply shrink class to label when input is empty', () => {
    const { getByText } = render(<FormInput label="Email" value="" />);
    expect(getByText('Email')).not.toHaveClass('shrink');
  });
});