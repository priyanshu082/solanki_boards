import React, { useEffect } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import logo from "../assets/logo.png"

// User type definition
interface User {
  name: string;
}

const Navbar: React.FC = () => {
  const [user, setUser] = React.useState<User | null>(null);
  const navigate = useNavigate();

  // Fetch user data from localStorage or use dummy data
  useEffect(() => {
    const name = localStorage.getItem('name');
    setUser({ name: name || 'Admin' });
  }, []);

  const handleLogout = () => {
    // Clear user data from localStorage

    localStorage.removeItem('id');
    localStorage.removeItem('role');
    localStorage.removeItem('token');
    localStorage.removeItem('name');
    setUser(null);
    navigate('/login');
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
        <span className="font-semibold text-xl text-gray-800">SBCODL ADMINISTRATION</span>
      </Link>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar className="cursor-pointer rounded-full h-9 w-9">
            <AvatarFallback className="bg-gray-100 text-black font-medium">
              {user.name.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuSeparator />
          {/* <DropdownMenuItem onSelect={handleProfileClick}>
            Profile
          </DropdownMenuItem> */}
          <DropdownMenuItem onSelect={handleLogout}>
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default Navbar;
