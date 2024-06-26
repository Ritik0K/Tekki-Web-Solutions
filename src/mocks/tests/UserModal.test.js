import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import UserModal from '../../pages/Home/UserModal';


const mockUser = {
  id: 1,
  name: 'John Doe',
  username: 'johndoe',
  email: 'john@example.com',
  address: {
    city: 'New York',
    street: '123 Main St',
  },
  phone: '123-456-7890',
  website: 'johndoe.com',
};

describe('UserModal', () => {
  it('renders correctly with user details', () => {
    render(<UserModal user={mockUser} show={true} onHide={() => {}} />);
    
    expect(screen.getByText('User Details')).toBeInTheDocument();
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('ID: 1')).toBeInTheDocument();
    expect(screen.getByText('johndoe')).toBeInTheDocument();
    expect(screen.getByText('john@example.com')).toBeInTheDocument();
    expect(screen.getByText('123 Main St, New York')).toBeInTheDocument();
    expect(screen.getByText('123-456-7890')).toBeInTheDocument();
    expect(screen.getByText('johndoe.com')).toBeInTheDocument();
  });

  it('does not render when show is false', () => {
    const { container } = render(<UserModal user={mockUser} show={false} onHide={() => {}} />);
    expect(container.firstChild).toBeNull();
  });
});
