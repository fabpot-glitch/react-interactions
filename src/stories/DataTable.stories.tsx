import type { Meta, StoryObj } from '@storybook/react';
import { DataTable } from '../components/DataTable/DataTable';
import { useState } from 'react';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'inactive';
  lastLogin: string;
  age: number;
}

const sampleData: User[] = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    role: 'Admin',
    status: 'active',
    lastLogin: '2024-01-15',
    age: 30,
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'jane@example.com',
    role: 'User',
    status: 'active',
    lastLogin: '2024-01-14',
    age: 25,
  },
  {
    id: 3,
    name: 'Bob Johnson',
    email: 'bob@example.com',
    role: 'Moderator',
    status: 'inactive',
    lastLogin: '2024-01-10',
    age: 35,
  },
  {
    id: 4,
    name: 'Alice Brown',
    email: 'alice@example.com',
    role: 'User',
    status: 'active',
    lastLogin: '2024-01-16',
    age: 28,
  },
  {
    id: 5,
    name: 'Charlie Wilson',
    email: 'charlie@example.com',
    role: 'User',
    status: 'inactive',
    lastLogin: '2024-01-12',
    age: 42,
  },
];

const basicColumns = [
  {
    key: 'name',
    title: 'Name',
    dataIndex: 'name' as keyof User,
    sortable: true,
  },
  {
    key: 'email',
    title: 'Email',
    dataIndex: 'email' as keyof User,
    sortable: true,
  },
  {
    key: 'role',
    title: 'Role',
    dataIndex: 'role' as keyof User,
    sortable: true,
  },
];

const advancedColumns = [
  {
    key: 'name',
    title: 'Name',
    dataIndex: 'name' as keyof User,
    sortable: true,
    width: '200px',
  },
  {
    key: 'email',
    title: 'Email',
    dataIndex: 'email' as keyof User,
    sortable: true,
  },
  {
    key: 'role',
    title: 'Role',
    dataIndex: 'role' as keyof User,
    sortable: true,
    render: (value: string) => (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
        value === 'Admin' ? 'bg-purple-100 text-purple-800' :
        value === 'Moderator' ? 'bg-blue-100 text-blue-800' :
        'bg-gray-100 text-gray-800'
      }`}>
        {value}
      </span>
    ),
  },
  {
    key: 'status',
    title: 'Status',
    dataIndex: 'status' as keyof User,
    sortable: true,
    render: (value: string) => (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
        value === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
      }`}>
        {value}
      </span>
    ),
  },
  {
    key: 'lastLogin',
    title: 'Last Login',
    dataIndex: 'lastLogin' as keyof User,
    sortable: true,
  },
  {
    key: 'age',
    title: 'Age',
    dataIndex: 'age' as keyof User,
    sortable: true,
    width: '80px',
  },
];

const meta: Meta<typeof DataTable> = {
  title: 'Components/DataTable',
  component: DataTable,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'A feature-rich data table component with sorting, selection, and loading states.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    data: sampleData,
    columns: basicColumns,
  },
};

export const WithSelection: Story = {
  render: () => {
    const [selectedRows, setSelectedRows] = useState<User[]>([]);
    
    return (
      <div>
        <DataTable
          data={sampleData}
          columns={advancedColumns}
          selectable
          onRowSelect={setSelectedRows}
        />
        {selectedRows.length > 0 && (
          <div className="mt-4 p-4 bg-blue-50 rounded-lg">
            <h4 className="font-medium text-blue-900">Selected Users:</h4>
            <ul className="mt-2 text-sm text-blue-800">
              {selectedRows.map(user => (
                <li key={user.id}>{user.name} ({user.email})</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  },
};

export const SingleSelection: Story = {
  render: () => {
    const [selectedRows, setSelectedRows] = useState<User[]>([]);
    
    return (
      <div>
        <DataTable
          data={sampleData}
          columns={advancedColumns}
          selectable
          multiSelect={false}
          onRowSelect={setSelectedRows}
        />
        {selectedRows.length > 0 && (
          <div className="mt-4 p-4 bg-green-50 rounded-lg">
            <h4 className="font-medium text-green-900">Selected User:</h4>
            <p className="mt-2 text-sm text-green-800">
              {selectedRows[0].name} ({selectedRows[0].email})
            </p>
          </div>
        )}
      </div>
    );
  },
};

export const Loading: Story = {
  args: {
    data: sampleData,
    columns: basicColumns,
    loading: true,
  },
};

export const Empty: Story = {
  args: {
    data: [],
    columns: basicColumns,
    emptyText: 'No users found',
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-medium mb-4">Small</h3>
        <DataTable data={sampleData.slice(0, 3)} columns={basicColumns} size="sm" />
      </div>
      <div>
        <h3 className="text-lg font-medium mb-4">Medium (Default)</h3>
        <DataTable data={sampleData.slice(0, 3)} columns={basicColumns} size="md" />
      </div>
      <div>
        <h3 className="text-lg font-medium mb-4">Large</h3>
        <DataTable data={sampleData.slice(0, 3)} columns={basicColumns} size="lg" />
      </div>
    </div>
  ),
};

export const CustomRendering: Story = {
  args: {
    data: sampleData,
    columns: advancedColumns,
    selectable: true,
  },
};

export const WithSorting: Story = {
  render: () => {
    const [sortedData, setSortedData] = useState(sampleData);
    
    const handleSort = (dataIndex: keyof User, direction: 'asc' | 'desc' | null) => {
      if (!direction) {
        setSortedData(sampleData);
        return;
      }
      
      const sorted = [...sortedData].sort((a, b) => {
        const aVal = a[dataIndex];
        const bVal = b[dataIndex];
        
        if (direction === 'asc') {
          return aVal > bVal ? 1 : -1;
        } else {
          return aVal < bVal ? 1 : -1;
        }
      });
      
      setSortedData(sorted);
    };
    
    return (
      <DataTable
        data={sortedData}
        columns={advancedColumns}
        onSort={handleSort}
      />
    );
  },
};

export const NoBorder: Story = {
  args: {
    data: sampleData,
    columns: basicColumns,
    bordered: false,
    hoverable: false,
  },
};