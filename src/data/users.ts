// Mock user data for testing login/register functionality

// Simulating hashed passwords (in a real app, these would be bcrypt hashed)
// For testing, the plain text passwords are:
// user1@example.com: password123
// user2@example.com: password456

interface User {
  id: number;
  fullName: string;
  email: string;
  password: string; // In a real app, this would be hashed
  phone: string;
  county: string;
  town: string;
  createdAt: string;
}

export const users: User[] = [
  {
    id: 1,
    fullName: 'John Doe',
    email: 'user1@example.com',
    password: 'password123', // In a real app, this would be hashed
    phone: '+254 712 345 678',
    county: 'Nairobi',
    town: 'CBD',
    createdAt: '2023-01-15T00:00:00Z'
  },
  {
    id: 2,
    fullName: 'Jane Smith',
    email: 'user2@example.com',
    password: 'password456', // In a real app, this would be hashed
    phone: '+254 723 456 789',
    county: 'Mombasa',
    town: 'Nyali',
    createdAt: '2023-02-20T00:00:00Z'
  }
];

// Find a user by email (for login)
export const findUserByEmail = (email: string): User | undefined => {
  return users.find(user => user.email.toLowerCase() === email.toLowerCase());
};

// Add a new user (for registration)
export const addUser = (userData: Omit<User, 'id' | 'createdAt'>): User => {
  const newUser: User = {
    ...userData,
    id: users.length + 1,
    createdAt: new Date().toISOString()
  };
  
  users.push(newUser);
  return newUser;
};

// Get user by ID
export const getUserById = (id: number): User | undefined => {
  return users.find(user => user.id === id);
};