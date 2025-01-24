import React, { useEffect } from 'react';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
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
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
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
    localStorage.removeItem('user');
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
      className="fixed top-0 left-[20vw] right-0 bg-white shadow-sm h-16 flex items-center justify-between px-8 z-20"
    >
       <Link to="/" className="flex items-center space-x-2">
            <img 
              src={logo} 
              alt="Logo" 
              className="h-8 object-contain"
            />
            <span className="font-semibold text-xl text-gray-800">SOLANKI BOARDS </span>
          </Link>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar className="cursor-pointer">
            <AvatarImage src={user.avatarUrl} alt={user.name} />
            <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuLabel>
            <div className="flex flex-col">
              <span className="font-medium">{user.name}</span>
              <span className="text-xs text-gray-500">{user.email}</span>
            </div>
          </DropdownMenuLabel>
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
