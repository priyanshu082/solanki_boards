import React, { useEffect } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import logo from "../assets/logo.png"

// User type definition
interface User {
  name: string;
  email: string;
  avatarUrl?: string;
}

const Navbar: React.FC = () => {
  const [user, setUser] = React.useState<User | null>(null);
  const navigate = useNavigate();

  // Fetch user data from localStorage or use dummy data
  useEffect(() => {
    const storedUser = localStorage.getItem('avatarUrl');
    if (storedUser) {
      setUser(
        {
          name: 'John Doe',
          email: 'john@example.com',
          avatarUrl: storedUser,
        }
      );
    } else {
      // Dummy data if no user is found in localStorage
      setUser({
        name: 'John Doe',
        email: 'john@example.com',
        avatarUrl: '/path/to/avatar.jpg',
      });
    }
  }, []);

  const handleLogout = () => {
    // Clear user data from localStorage

    localStorage.removeItem('id');
    localStorage.removeItem('paymentStatus');
    localStorage.removeItem('role');
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('avatarUrl');
    localStorage.removeItem('merchantTransactionId');
    setUser(null);
    navigate('/login');
  };

  const handleProfileClick = () => {
    navigate('/profile');
  };

  // Return nothing if no user is available
  if (!user) return null;

  return (
    <div
      className="fixed top-0 md:left-[20vw] left-[5vw] right-0 bg-white shadow-sm h-16 flex items-center justify-between px-8 z-20"
    >
      <Link to="/" className="flex items-center space-x-2">
        <img
          src={logo}
          alt="Logo"
          className="h-8 object-contain"
        />
        <span className="font-semibold text-xl text-gray-800">SBCODL INSTITUTION'S </span>
      </Link>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar className="cursor-pointer">
            <AvatarImage src={user.avatarUrl} alt={user.name} />
            <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuSeparator />
          <DropdownMenuItem onSelect={handleProfileClick}>
            Profile
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={handleLogout}>
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default Navbar;
