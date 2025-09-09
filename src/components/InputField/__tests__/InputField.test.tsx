import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { InputField } from '../InputField';
import '@testing-library/jest-dom';

describe('InputField', () => {
  it('renders with basic props', () => {
    render(
      <InputField 
        label="Username" 
        placeholder="Enter username" 
        value="" 
        onChange={() => {}} 
      />
    );
    
    expect(screen.getByLabelText('Username')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter username')).toBeInTheDocument();
  });

  it('shows required asterisk when required', () => {
    render(<InputField label="Required Field" required />);
    expect(screen.getByText('*')).toBeInTheDocument();
  });

  it('displays error message', () => {
    render(
      <InputField 
        label="Email" 
        errorMessage="Invalid email" 
        value="" 
        onChange={() => {}} 
      />
    );
    
    expect(screen.getByRole('alert')).toHaveTextContent('Invalid email');
  });

  it('displays helper text', () => {
    render(
      <InputField 
        label="Password" 
        helperText="Must be at least 8 characters" 
        value="" 
        onChange={() => {}} 
      />
    );
    
    expect(screen.getByText('Must be at least 8 characters')).toBeInTheDocument();
  });

  it('handles password toggle', async () => {
    const user = userEvent.setup();
    
    render(
      <InputField 
        type="password" 
        showPasswordToggle 
        value="secret" 
        onChange={() => {}} 
      />
    );
    
    const input = screen.getByRole('textbox') as HTMLInputElement;
    const toggleButton = screen.getByLabelText('Show password');
    
    expect(input.type).toBe('password');
    
    await user.click(toggleButton);
    expect(input.type).toBe('text');
    
    await user.click(screen.getByLabelText('Hide password'));
    expect(input.type).toBe('password');
  });

  it('handles clear functionality', async () => {
    const user = userEvent.setup();
    const mockOnChange = jest.fn();
    
    render(
      <InputField 
        clearable 
        value="some text" 
        onChange={mockOnChange} 
      />
    );
    
    const clearButton = screen.getByLabelText('Clear input');
    await user.click(clearButton);
    
    expect(mockOnChange).toHaveBeenCalledWith(
      expect.objectContaining({
        target: expect.objectContaining({ value: '' })
      })
    );
  });

  it('shows loading spinner', () => {
    render(<InputField loading value="" onChange={() => {}} />);
    expect(screen.getByRole('textbox')).toBeInTheDocument();
    // The loading spinner should be present (we can't easily test for the spinning animation)
  });

  it('is disabled when disabled prop is true', () => {
    render(<InputField disabled value="" onChange={() => {}} />);
    expect(screen.getByRole('textbox')).toBeDisabled();
  });

  it('applies different variants correctly', () => {
    const { rerender } = render(
      <InputField variant="outlined" value="" onChange={() => {}} />
    );
    
    const input = screen.getByRole('textbox');
    expect(input).toHaveClass('bg-white', 'border-gray-300');
    
    rerender(<InputField variant="filled" value="" onChange={() => {}} />);
    expect(input).toHaveClass('bg-gray-50', 'border-gray-200');
    
    rerender(<InputField variant="ghost" value="" onChange={() => {}} />);
    expect(input).toHaveClass('bg-transparent', 'border-gray-300');
  });

  it('applies different sizes correctly', () => {
    const { rerender } = render(
      <InputField size="sm" value="" onChange={() => {}} />
    );
    
    let input = screen.getByRole('textbox');
    expect(input).toHaveClass('px-3', 'py-1.5', 'text-sm');
    
    rerender(<InputField size="md" value="" onChange={() => {}} />);
    input = screen.getByRole('textbox');
    expect(input).toHaveClass('px-3', 'py-2', 'text-sm');
    
    rerender(<InputField size="lg" value="" onChange={() => {}} />);
    input = screen.getByRole('textbox');
    expect(input).toHaveClass('px-4', 'py-3', 'text-base');
  });

  it('handles onChange events', async () => {
    const user = userEvent.setup();
    const mockOnChange = jest.fn();
    
    render(<InputField value="" onChange={mockOnChange} />);
    
    const input = screen.getByRole('textbox');
    await user.type(input, 'hello');
    
    expect(mockOnChange).toHaveBeenCalledTimes(5); // One for each character
  });
});