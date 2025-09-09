import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { DataTable } from '../DataTable';
import '@testing-library/jest-dom';

interface TestUser {
  id: number;
  name: string;
  email: string;
  role: string;
}

const mockData: TestUser[] = [
  { id: 1, name: 'John Doe', email: 'john@test.com', role: 'Admin' },
  { id: 2, name: 'Jane Smith', email: 'jane@test.com', role: 'User' },
  { id: 3, name: 'Bob Johnson', email: 'bob@test.com', role: 'User' },
];

const mockColumns = [
  { key: 'name', title: 'Name', dataIndex: 'name' as keyof TestUser, sortable: true },
  { key: 'email', title: 'Email', dataIndex: 'email' as keyof TestUser, sortable: true },
  { key: 'role', title: 'Role', dataIndex: 'role' as keyof TestUser },
];

describe('DataTable', () => {
  it('renders table with data', () => {
    render(<DataTable data={mockData} columns={mockColumns} />);
    
    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('Email')).toBeInTheDocument();
    expect(screen.getByText('Role')).toBeInTheDocument();
    
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('jane@test.com')).toBeInTheDocument();
    expect(screen.getByText('Admin')).toBeInTheDocument();
  });

  it('shows loading state', () => {
    render(<DataTable data={[]} columns={mockColumns} loading />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('shows empty state', () => {
    render(<DataTable data={[]} columns={mockColumns} emptyText="No users found" />);
    expect(screen.getByText('No users found')).toBeInTheDocument();
  });

  it('handles row selection', async () => {
    const user = userEvent.setup();
    const mockOnRowSelect = jest.fn();
    
    render(
      <DataTable 
        data={mockData} 
        columns={mockColumns} 
        selectable 
        onRowSelect={mockOnRowSelect} 
      />
    );
    
    const checkboxes = screen.getAllByRole('checkbox');
    const firstRowCheckbox = checkboxes[1]; // First checkbox is select all
    
    await user.click(firstRowCheckbox);
    
    expect(mockOnRowSelect).toHaveBeenCalledWith([mockData[0]]);
  });

  it('handles select all', async () => {
    const user = userEvent.setup();
    const mockOnRowSelect = jest.fn();
    
    render(
      <DataTable 
        data={mockData} 
        columns={mockColumns} 
        selectable 
        onRowSelect={mockOnRowSelect} 
      />
    );
    
    const selectAllCheckbox = screen.getByLabelText('Select all rows');
    await user.click(selectAllCheckbox);
    
    expect(mockOnRowSelect).toHaveBeenCalledWith(mockData);
  });

  it('handles single selection mode', async () => {
    const user = userEvent.setup();
    const mockOnRowSelect = jest.fn();
    
    render(
      <DataTable 
        data={mockData} 
        columns={mockColumns} 
        selectable 
        multiSelect={false}
        onRowSelect={mockOnRowSelect} 
      />
    );
    
    const radioButtons = screen.getAllByRole('radio');
    await user.click(radioButtons[0]);
    
    expect(mockOnRowSelect).toHaveBeenCalledWith([mockData[0]]);
  });

  it('handles sorting', async () => {
    const user = userEvent.setup();
    const mockOnSort = jest.fn();
    
    render(
      <DataTable 
        data={mockData} 
        columns={mockColumns} 
        onSort={mockOnSort} 
      />
    );
    
    const nameHeader = screen.getByText('Name').closest('th');
    await user.click(nameHeader!);
    
    expect(mockOnSort).toHaveBeenCalledWith('name', 'asc');
  });

  it('shows selected rows count', () => {
    render(
      <DataTable 
        data={mockData} 
        columns={mockColumns} 
        selectable 
      />
    );
    
    // Initially no rows selected, so count shouldn't be visible
    expect(screen.queryByText(/rows? selected/)).not.toBeInTheDocument();
  });

  it('applies custom row key', () => {
    const customRowKey = (record: TestUser) => `user-${record.id}`;
    
    render(
      <DataTable 
        data={mockData} 
        columns={mockColumns} 
        rowKey={customRowKey}
      />
    );
    
    // Should render without errors
    expect(screen.getByText('John Doe')).toBeInTheDocument();
  });

  it('renders custom cell content', () => {
    const columnsWithRender = [
      {
        key: 'name',
        title: 'Name',
        dataIndex: 'name' as keyof TestUser,
        render: (value: string) => <strong>{value}</strong>,
      },
    ];
    
    render(<DataTable data={mockData} columns={columnsWithRender} />);
    
    const strongElement = screen.getByText('John Doe');
    expect(strongElement.tagName).toBe('STRONG');
  });

  it('applies different sizes correctly', () => {
    const { rerender } = render(
      <DataTable data={mockData} columns={mockColumns} size="sm" />
    );
    
    expect(document.querySelector('table')).toHaveClass('text-xs');
    
    rerender(<DataTable data={mockData} columns={mockColumns} size="md" />);
    expect(document.querySelector('table')).toHaveClass('text-sm');
    
    rerender(<DataTable data={mockData} columns={mockColumns} size="lg" />);
    expect(document.querySelector('table')).toHaveClass('text-base');
  });

  it('handles hover and border props', () => {
    render(
      <DataTable 
        data={mockData} 
        columns={mockColumns} 
        hoverable={false} 
        bordered={false} 
      />
    );
    
    // Should render without errors
    expect(screen.getByText('John Doe')).toBeInTheDocument();
  });
});