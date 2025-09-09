import React, { useState, useEffect } from 'react';
import { InputField } from '../components/InputField/InputField';
import { DataTable } from '../components/DataTable/DataTable';
import { Column } from '../components/DataTable/DataTable.types';
import { Users, Search, Mail, Lock, Sparkles, Zap, Heart, Star } from 'lucide-react';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'inactive';
  joinDate: string;
  avatar: string;
  score: number;
}

const sampleUsers: User[] = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    role: 'Admin',
    status: 'active',
    joinDate: '2023-01-15',
    avatar: '👨‍💼',
    score: 95,
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'jane@example.com',
    role: 'User',
    status: 'active',
    joinDate: '2023-02-20',
    avatar: '👩‍💻',
    score: 88,
  },
  {
    id: 3,
    name: 'Bob Johnson',
    email: 'bob@example.com',
    role: 'Moderator',
    status: 'inactive',
    joinDate: '2023-03-10',
    avatar: '👨‍🎨',
    score: 76,
  },
  {
    id: 4,
    name: 'Alice Brown',
    email: 'alice@example.com',
    role: 'User',
    status: 'active',
    joinDate: '2023-04-05',
    avatar: '👩‍🔬',
    score: 92,
  },
  {
    id: 5,
    name: 'Charlie Wilson',
    email: 'charlie@example.com',
    role: 'User',
    status: 'active',
    joinDate: '2023-05-12',
    avatar: '👨‍🚀',
    score: 84,
  },
  {
    id: 6,
    name: 'Diana Prince',
    email: 'diana@example.com',
    role: 'Admin',
    status: 'active',
    joinDate: '2023-06-18',
    avatar: '👸',
    score: 98,
  },
];

export const Demo: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [feedback, setFeedback] = useState('');
  const [selectedUsers, setSelectedUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [animateHeader, setAnimateHeader] = useState(false);
  const [currentVariant, setCurrentVariant] = useState<'outlined' | 'filled' | 'ghost'>('outlined');
  const [currentSize, setCurrentSize] = useState<'sm' | 'md' | 'lg'>('md');
  const [sparkles, setSparkles] = useState<Array<{ id: number; x: number; y: number }>>([]);

  // Animate header on mount
  useEffect(() => {
    setAnimateHeader(true);
  }, []);

  // Create sparkle effect
  useEffect(() => {
    const interval = setInterval(() => {
      setSparkles(prev => [
        ...prev.slice(-10),
        {
          id: Date.now(),
          x: Math.random() * window.innerWidth,
          y: Math.random() * 200,
        }
      ]);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  // Auto-cycle variants and sizes
  useEffect(() => {
    const variantInterval = setInterval(() => {
      setCurrentVariant(prev => {
        const variants: Array<'outlined' | 'filled' | 'ghost'> = ['outlined', 'filled', 'ghost'];
        const currentIndex = variants.indexOf(prev);
        return variants[(currentIndex + 1) % variants.length];
      });
    }, 3000);

    const sizeInterval = setInterval(() => {
      setCurrentSize(prev => {
        const sizes: Array<'sm' | 'md' | 'lg'> = ['sm', 'md', 'lg'];
        const currentIndex = sizes.indexOf(prev);
        return sizes[(currentIndex + 1) % sizes.length];
      });
    }, 4000);

    return () => {
      clearInterval(variantInterval);
      clearInterval(sizeInterval);
    };
  }, []);

  const columns: Column<User>[] = [
    {
      key: 'avatar',
      title: '👤',
      dataIndex: 'avatar',
      width: '60px',
      render: (value: string, record: User) => (
        <div className="flex items-center justify-center">
          <span className="text-2xl animate-bounce" style={{ animationDelay: `${record.id * 0.1}s` }}>
            {value}
          </span>
        </div>
      ),
    },
    {
      key: 'name',
      title: 'Name',
      dataIndex: 'name',
      sortable: true,
      width: '200px',
      render: (value: string) => (
        <span className="font-medium text-gray-900 hover:text-blue-600 transition-colors duration-200 cursor-pointer">
          {value}
        </span>
      ),
    },
    {
      key: 'email',
      title: 'Email',
      dataIndex: 'email',
      sortable: true,
      render: (value: string) => (
        <span className="text-gray-600 hover:text-gray-900 transition-colors duration-200">
          {value}
        </span>
      ),
    },
    {
      key: 'role',
      title: 'Role',
      dataIndex: 'role',
      sortable: true,
      render: (value: string) => (
        <span className={`px-3 py-1 rounded-full text-xs font-medium transition-all duration-300 hover:scale-105 cursor-pointer ${
          value === 'Admin' ? 'bg-gradient-to-r from-purple-100 to-purple-200 text-purple-800 hover:from-purple-200 hover:to-purple-300' :
          value === 'Moderator' ? 'bg-gradient-to-r from-blue-100 to-blue-200 text-blue-800 hover:from-blue-200 hover:to-blue-300' :
          'bg-gradient-to-r from-gray-100 to-gray-200 text-gray-800 hover:from-gray-200 hover:to-gray-300'
        }`}>
          {value}
        </span>
      ),
    },
    {
      key: 'status',
      title: 'Status',
      dataIndex: 'status',
      sortable: true,
      render: (value: string) => (
        <div className="flex items-center space-x-2">
          <div className={`w-2 h-2 rounded-full animate-pulse ${
            value === 'active' ? 'bg-green-500' : 'bg-red-500'
          }`}></div>
          <span className={`px-3 py-1 rounded-full text-xs font-medium transition-all duration-300 hover:scale-105 ${
            value === 'active' 
              ? 'bg-gradient-to-r from-green-100 to-green-200 text-green-800 hover:from-green-200 hover:to-green-300' 
              : 'bg-gradient-to-r from-red-100 to-red-200 text-red-800 hover:from-red-200 hover:to-red-300'
          }`}>
            {value}
          </span>
        </div>
      ),
    },
    {
      key: 'score',
      title: 'Score',
      dataIndex: 'score',
      sortable: true,
      width: '120px',
      render: (value: number) => (
        <div className="flex items-center space-x-2">
          <div className="flex-1 bg-gray-200 rounded-full h-2 overflow-hidden">
            <div 
              className={`h-full transition-all duration-1000 ease-out rounded-full ${
                value >= 90 ? 'bg-gradient-to-r from-green-400 to-green-600' :
                value >= 80 ? 'bg-gradient-to-r from-blue-400 to-blue-600' :
                'bg-gradient-to-r from-yellow-400 to-yellow-600'
              }`}
              style={{ width: `${value}%` }}
            ></div>
          </div>
          <span className="text-sm font-medium text-gray-700">{value}</span>
        </div>
      ),
    },
    {
      key: 'joinDate',
      title: 'Join Date',
      dataIndex: 'joinDate',
      sortable: true,
      render: (value: string) => (
        <span className="text-gray-600 hover:text-gray-900 transition-colors duration-200">
          {new Date(value).toLocaleDateString()}
        </span>
      ),
    },
  ];

  const filteredUsers = sampleUsers.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleLoadData = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    }, 2000);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && password && username) {
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    }
  };

  const getValidationState = (value: string, type: 'email' | 'password' | 'username') => {
    if (!value) return { valid: null, message: '' };
    
    switch (type) {
      case 'email':
        const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
        return {
          valid: emailValid,
          message: emailValid ? '✅ Valid email format' : '❌ Please enter a valid email'
        };
      case 'password':
        const passwordValid = value.length >= 6;
        return {
          valid: passwordValid,
          message: passwordValid ? '✅ Strong password' : '❌ Password must be at least 6 characters'
        };
      case 'username':
        const usernameValid = value.length >= 3;
        return {
          valid: usernameValid,
          message: usernameValid ? '✅ Great username!' : '❌ Username must be at least 3 characters'
        };
      default:
        return { valid: null, message: '' };
    }
  };

  const emailValidation = getValidationState(email, 'email');
  const passwordValidation = getValidationState(password, 'password');
  const usernameValidation = getValidationState(username, 'username');

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 relative overflow-hidden">
      {/* Animated background sparkles */}
      {sparkles.map(sparkle => (
        <div
          key={sparkle.id}
          className="absolute pointer-events-none animate-ping"
          style={{ left: sparkle.x, top: sparkle.y }}
        >
          <Sparkles className="w-4 h-4 text-yellow-400 opacity-60" />
        </div>
      ))}

      {/* Floating geometric shapes */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full opacity-20 animate-bounce" style={{ animationDelay: '0s', animationDuration: '3s' }}></div>
      <div className="absolute top-40 right-20 w-16 h-16 bg-gradient-to-r from-pink-400 to-red-400 rounded-full opacity-20 animate-bounce" style={{ animationDelay: '1s', animationDuration: '4s' }}></div>
      <div className="absolute bottom-40 left-20 w-12 h-12 bg-gradient-to-r from-green-400 to-blue-400 rounded-full opacity-20 animate-bounce" style={{ animationDelay: '2s', animationDuration: '5s' }}></div>

      <div className="relative z-10 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Animated Header */}
          <div className={`mb-12 text-center transform transition-all duration-1000 ${
            animateHeader ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}>
            <div className="flex items-center justify-center space-x-4 mb-4">
              <div className="animate-spin">
                <Zap className="w-8 h-8 text-blue-600" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Interactive Component Library
              </h1>
              <div className="animate-pulse">
                <Heart className="w-8 h-8 text-pink-500" />
              </div>
            </div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Experience the power of modern React components with real-time interactions, 
              smooth animations, and delightful user experiences ✨
            </p>
            
            {/* Live stats */}
            <div className="flex justify-center space-x-8 mt-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600 animate-pulse">{filteredUsers.length}</div>
                <div className="text-sm text-gray-500">Active Users</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600 animate-pulse">{selectedUsers.length}</div>
                <div className="text-sm text-gray-500">Selected</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600 animate-pulse">
                  {searchTerm.length + email.length + password.length + username.length}
                </div>
                <div className="text-sm text-gray-500">Characters Typed</div>
              </div>
            </div>
          </div>

          {/* Success notification */}
          {showSuccess && (
            <div className="fixed top-4 right-4 z-50 bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-3 rounded-lg shadow-lg transform animate-bounce">
              <div className="flex items-center space-x-2">
                <Star className="w-5 h-5" />
                <span>Success! Action completed 🎉</span>
              </div>
            </div>
          )}

          {/* Interactive Form Section */}
          <div className="mb-12">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1">
              <div className="flex items-center space-x-3 mb-8">
                <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                  Interactive Form Demo
                </h2>
                <div className="flex space-x-2">
                  <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                  <div className="w-3 h-3 bg-yellow-400 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                  <div className="w-3 h-3 bg-red-400 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                </div>
              </div>
              
              <form onSubmit={handleFormSubmit} className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div className="transform transition-all duration-300 hover:scale-105">
                    <InputField
                      label="🔍 Search Users"
                      placeholder="Type to search users..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      clearable
                      helperText={`Found ${filteredUsers.length} users matching your search`}
                      variant={currentVariant}
                      size={currentSize}
                    />
                  </div>
                  
                  <div className="transform transition-all duration-300 hover:scale-105">
                    <InputField
                      label="👤 Username"
                      placeholder="Choose your username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      variant="filled"
                      required
                      helperText={usernameValidation.message}
                      invalid={usernameValidation.valid === false}
                    />
                  </div>
                  
                  <div className="transform transition-all duration-300 hover:scale-105">
                    <InputField
                      label="📧 Email Address"
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      variant="outlined"
                      required
                      helperText={emailValidation.message}
                      invalid={emailValidation.valid === false}
                    />
                  </div>
                </div>
                
                <div className="space-y-6">
                  <div className="transform transition-all duration-300 hover:scale-105">
                    <InputField
                      label="🔒 Password"
                      type="password"
                      placeholder="Create a secure password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      showPasswordToggle
                      size="lg"
                      helperText={passwordValidation.message}
                      invalid={passwordValidation.valid === false}
                    />
                  </div>
                  
                  <div className="transform transition-all duration-300 hover:scale-105">
                    <InputField
                      label="💬 Feedback"
                      placeholder="Share your thoughts..."
                      value={feedback}
                      onChange={(e) => setFeedback(e.target.value)}
                      variant="ghost"
                      helperText={`${feedback.length}/200 characters`}
                    />
                  </div>
                  
                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
                  >
                    🚀 Submit Form
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Interactive DataTable Section */}
          <div className="mb-12">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8 hover:shadow-2xl transition-all duration-500">
              <div className="flex justify-between items-center mb-8">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg">
                    <Search className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                    Interactive Data Table
                  </h2>
                </div>
                <div className="flex space-x-4">
                  <button
                    onClick={handleLoadData}
                    disabled={isLoading}
                    className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? '⏳ Loading...' : '🔄 Refresh Data'}
                  </button>
                  <div className="px-4 py-2 bg-gradient-to-r from-gray-100 to-gray-200 rounded-lg text-gray-700 font-medium">
                    📊 {filteredUsers.length} Records
                  </div>
                </div>
              </div>
              
              <div className="transform transition-all duration-500 hover:scale-[1.01]">
                <DataTable
                  data={filteredUsers}
                  columns={columns}
                  loading={isLoading}
                  selectable
                  onRowSelect={setSelectedUsers}
                  emptyText="🔍 No users found matching your search criteria"
                  hoverable
                  bordered
                  size="md"
                />
              </div>
              
              {selectedUsers.length > 0 && (
                <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-200 transform animate-pulse">
                  <h4 className="font-bold text-blue-900 mb-4 flex items-center space-x-2">
                    <Star className="w-5 h-5" />
                    <span>Selected Users ({selectedUsers.length})</span>
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {selectedUsers.map((user, index) => (
                      <div 
                        key={user.id} 
                        className="flex items-center space-x-3 p-3 bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 transform hover:scale-105"
                        style={{ animationDelay: `${index * 0.1}s` }}
                      >
                        <span className="text-2xl">{user.avatar}</span>
                        <div>
                          <div className="font-medium text-gray-900">{user.name}</div>
                          <div className="text-sm text-gray-600">{user.email}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Feature Showcase */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: '🎨',
                title: 'Dynamic Styling',
                description: 'Components automatically cycle through variants and sizes',
                color: 'from-pink-500 to-rose-500'
              },
              {
                icon: '⚡',
                title: 'Real-time Validation',
                description: 'Instant feedback as you type with visual indicators',
                color: 'from-yellow-500 to-orange-500'
              },
              {
                icon: '🎯',
                title: 'Interactive Selection',
                description: 'Multi-select rows with animated feedback',
                color: 'from-green-500 to-emerald-500'
              },
              {
                icon: '🔍',
                title: 'Live Search',
                description: 'Filter data in real-time with instant results',
                color: 'from-blue-500 to-cyan-500'
              },
              {
                icon: '📊',
                title: 'Progress Tracking',
                description: 'Animated progress bars and live statistics',
                color: 'from-purple-500 to-violet-500'
              },
              {
                icon: '✨',
                title: 'Smooth Animations',
                description: 'Delightful micro-interactions throughout',
                color: 'from-indigo-500 to-purple-500'
              }
            ].map((feature, index) => (
              <div 
                key={index}
                className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-white/20 p-6 hover:shadow-xl transform hover:-translate-y-2 transition-all duration-500"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className={`w-12 h-12 bg-gradient-to-r ${feature.color} rounded-lg flex items-center justify-center text-white text-xl mb-4 animate-bounce`}>
                  {feature.icon}
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>

          {/* Footer */}
          <div className="mt-16 text-center">
            <div className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-gray-800 to-gray-900 text-white rounded-full">
              <Sparkles className="w-5 h-5 animate-spin" />
              <span className="font-medium">Built with React, TypeScript & TailwindCSS</span>
              <Heart className="w-5 h-5 text-red-400 animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};