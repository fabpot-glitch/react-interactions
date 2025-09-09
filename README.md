# React Component Library

A professional, production-ready React component library featuring InputField and DataTable components built with TypeScript, TailwindCSS, and comprehensive Storybook documentation.

## 🚀 Features

### InputField Component
- **Multiple Variants**: outlined (default), filled, ghost
- **Three Sizes**: small, medium, large
- **Validation States**: error messages, invalid state, helper text
- **Interactive Features**: password toggle, clear button, loading spinner
- **Accessibility**: ARIA labels, proper focus management
- **TypeScript**: Full type safety with comprehensive interfaces

### DataTable Component
- **Data Display**: Flexible tabular data presentation
- **Sorting**: Click column headers to sort (with visual indicators)
- **Selection**: Single or multi-row selection with callbacks
- **States**: Loading, empty state handling
- **Custom Rendering**: Column-specific render functions
- **Responsive**: Mobile-friendly design
- **Generic Types**: Full TypeScript support for any data type

## 🛠️ Tech Stack

- **React 18** - Latest React with hooks
- **TypeScript** - Full type safety
- **TailwindCSS** - Utility-first styling
- **Storybook** - Component documentation and development
- **Vitest** - Fast unit testing
- **Lucide React** - Beautiful icons

## 📦 Installation

```bash
# Clone the repository
git clone <repository-url>

# Install dependencies
npm install

# Start development server
npm run dev

# Start Storybook
npm run storybook

# Run tests
npm run test
```

## 🎨 Component Usage

### InputField

```tsx
import { InputField } from './components/InputField/InputField';

function MyForm() {
  const [value, setValue] = useState('');
  
  return (
    <InputField
      label="Username"
      placeholder="Enter username"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      variant="outlined"
      size="md"
      clearable
      required
      helperText="This will be your display name"
    />
  );
}
```

### DataTable

```tsx
import { DataTable, Column } from './components/DataTable/DataTable';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

const columns: Column<User>[] = [
  {
    key: 'name',
    title: 'Name',
    dataIndex: 'name',
    sortable: true,
  },
  {
    key: 'role',
    title: 'Role',
    dataIndex: 'role',
    render: (value) => <Badge>{value}</Badge>,
  },
];

function UserTable() {
  const [selectedUsers, setSelectedUsers] = useState<User[]>([]);
  
  return (
    <DataTable
      data={users}
      columns={columns}
      selectable
      onRowSelect={setSelectedUsers}
      loading={isLoading}
    />
  );
}
```

## 🧪 Testing

Comprehensive test suite with React Testing Library:

```bash
# Run tests
npm run test

# Run tests with UI
npm run test:ui

# Generate coverage report
npm run test:coverage
```

## 📚 Storybook Documentation

Interactive component documentation with all props and variations:

```bash
# Start Storybook development
npm run storybook

# Build Storybook for deployment
npm run build-storybook
```

## 🎯 Component APIs

### InputField Props

```tsx
interface InputFieldProps {
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  placeholder?: string;
  helperText?: string;
  errorMessage?: string;
  disabled?: boolean;
  invalid?: boolean;
  loading?: boolean;
  variant?: 'filled' | 'outlined' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  type?: 'text' | 'email' | 'password' | 'number';
  clearable?: boolean;
  showPasswordToggle?: boolean;
  required?: boolean;
}
```

### DataTable Props

```tsx
interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  loading?: boolean;
  selectable?: boolean;
  multiSelect?: boolean;
  onRowSelect?: (selectedRows: T[]) => void;
  onSort?: (dataIndex: keyof T, direction: 'asc' | 'desc' | null) => void;
  emptyText?: string;
  size?: 'sm' | 'md' | 'lg';
  bordered?: boolean;
  hoverable?: boolean;
}
```

## 🎨 Design System

The components follow a consistent design system:

- **Colors**: Primary blue (#3B82F6), success green (#10B981), error red (#EF4444)
- **Spacing**: 8px grid system
- **Typography**: Consistent font sizes and weights
- **Animations**: Smooth transitions and hover states
- **Accessibility**: WCAG compliant with proper ARIA labels

## 🏗️ Project Structure

```
src/
├── components/
│   ├── InputField/
│   │   ├── InputField.tsx
│   │   ├── InputField.types.ts
│   │   └── __tests__/
│   ├── DataTable/
│   │   ├── DataTable.tsx
│   │   ├── DataTable.types.ts
│   │   └── __tests__/
│   └── index.ts
├── stories/
│   ├── InputField.stories.tsx
│   └── DataTable.stories.tsx
├── demo/
│   └── Demo.tsx
└── test/
    └── setup.ts
```

## 🚀 Deployment

The project is ready for deployment with:

- **Storybook**: Deploy to Chromatic, Vercel, or Netlify
- **Component Library**: Publish to NPM
- **Demo App**: Deploy to any static hosting service

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Design inspired by modern component libraries like Ant Design and Material-UI
- Icons provided by Lucide React
- Built with the amazing React and TypeScript ecosystem