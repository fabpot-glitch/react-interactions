import type { Meta, StoryObj } from '@storybook/react';
import { InputField } from '../components/InputField/InputField';
import { useState } from 'react';

const meta: Meta<typeof InputField> = {
  title: 'Components/InputField',
  component: InputField,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A flexible input component with validation states, multiple variants, and comprehensive features.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['filled', 'outlined', 'ghost'],
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
    },
    type: {
      control: { type: 'select' },
      options: ['text', 'email', 'password', 'number'],
    },
  },
  decorators: [
    (Story) => (
      <div style={{ width: '400px', padding: '20px' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Template for controlled stories
const Template = (args: any) => {
  const [value, setValue] = useState(args.value || '');
  return (
    <InputField
      {...args}
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
};

export const Default: Story = {
  render: Template,
  args: {
    label: 'Username',
    placeholder: 'Enter your username',
    helperText: 'This will be your display name',
  },
};

export const Variants: Story = {
  render: () => (
    <div className="space-y-4">
      <InputField variant="outlined" label="Outlined (default)" placeholder="Outlined input" />
      <InputField variant="filled" label="Filled" placeholder="Filled input" />
      <InputField variant="ghost" label="Ghost" placeholder="Ghost input" />
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="space-y-4">
      <InputField size="sm" label="Small" placeholder="Small input" />
      <InputField size="md" label="Medium (default)" placeholder="Medium input" />
      <InputField size="lg" label="Large" placeholder="Large input" />
    </div>
  ),
};

export const States: Story = {
  render: () => (
    <div className="space-y-4">
      <InputField label="Normal" placeholder="Normal state" />
      <InputField label="Disabled" placeholder="Disabled state" disabled />
      <InputField label="Loading" placeholder="Loading state" loading />
      <InputField 
        label="Invalid" 
        placeholder="Invalid state" 
        invalid 
        errorMessage="This field is required" 
      />
    </div>
  ),
};

export const WithError: Story = {
  render: Template,
  args: {
    label: 'Email',
    placeholder: 'Enter your email',
    errorMessage: 'Please enter a valid email address',
    type: 'email',
  },
};

export const Password: Story = {
  render: Template,
  args: {
    label: 'Password',
    placeholder: 'Enter your password',
    type: 'password',
    showPasswordToggle: true,
    helperText: 'Password must be at least 8 characters',
  },
};

export const Clearable: Story = {
  render: Template,
  args: {
    label: 'Search',
    placeholder: 'Search for something...',
    clearable: true,
    value: 'Sample text',
  },
};

export const Required: Story = {
  render: Template,
  args: {
    label: 'Full Name',
    placeholder: 'Enter your full name',
    required: true,
    helperText: 'This field is required',
  },
};

export const AllFeatures: Story = {
  render: Template,
  args: {
    label: 'Advanced Input',
    placeholder: 'Type something...',
    helperText: 'This input has all features enabled',
    clearable: true,
    required: true,
    size: 'lg',
    variant: 'outlined',
  },
};