// src/__tests__/UserList.test.js
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import UserList from '../components/UserList';
import useUsers from '../hooks/useUsers';
import { mockUsers } from '../mocks/mockUsers';

// Mock the useUsers hook
jest.mock('../hooks/useUsers');

describe('UserList', () => {
  beforeEach(() => {
    useUsers.mockReturnValue({
      users: mockUsers,
      loading: false,
      error: null,
    });
  });

  it('renders a list of users', () => {
    render(<UserList />);
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Jane Smith')).toBeInTheDocument();
  });

  it('opens UserModal with user details on row click', () => {
    render(<UserList />);
    
    fireEvent.click(screen.getByText('John Doe'));
    
    expect(screen.getByText('User Details')).toBeInTheDocument();
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('ID: 1')).toBeInTheDocument();
    expect(screen.getByText('Username: johndoe')).toBeInTheDocument();
  });
});
