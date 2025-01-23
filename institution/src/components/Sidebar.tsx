import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ChevronDown, ChevronRight, Package, Settings } from 'lucide-react';
import logo from "../assets/logo.png"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Link } from 'react-router-dom';

interface MenuItem {
  name: string;
  path: string;
}

interface MenuSection {
  title: string;
  path: string;
  icon: React.ReactNode;
  items: MenuItem[];
}

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [openMenus, setOpenMenus] = React.useState<Record<string, boolean>>({});

  const menuItems: MenuSection[] = [
    {
      title: "Students",
      path: "/students",
      icon: <Package className="h-5 w-5" />,
      items: [
        { name: "Register Student", path: "/register-student" },
        { name: "Upload Document", path: "/upload-document" },
        { name: "Show Students", path: "/show-students" },
        { name: "Fee Payment", path: "/fee-payment" },
      ]
    },
    // {
    //   title: "Accounts",
    //   path: "/accounts",
    //   icon: <Users className="h-5 w-5" />,
    //   items: [
    //     { name: "My Wallet", path: "/accounts/my-wallet" },
    //     { name: "My Account", path: "/accounts/my-account" },
    //     { name: "Fee Payment", path: "/accounts/fee-payment" },
    //     { name: "Short Payments", path: "/accounts/short-payments" }
    //   ]
    // },
    {
      title: "Settings",
      path: "/settings",
      icon: <Settings className="h-5 w-5" />,
      items: [
        { name: "Profile", path: "profile" },
      ]
    }
  ];

  const toggleMenu = (menuTitle: string) => {
    setOpenMenus(prev => ({ ...prev, [menuTitle]: !prev[menuTitle] }));
  };

  const isActive = (path: string) => location.pathname === path;

  const MenuItem = ({ item }: { item: MenuItem }) => (
    <button
      className={`w-full px-4 py-2 text-left text-sm transition-all duration-200 ease-in-out
        hover:bg-blue-50 hover:text-blue-600 rounded-lg
        ${isActive(item.path) 
          ? 'bg-blue-50 text-blue-600 font-medium' 
          : 'text-gray-600 hover:translate-x-1'
        }`}
      onClick={() => navigate(item.path)}
      type="button"
    >
      {item.name}
    </button>
  );

  const MenuSection = ({ section }: { section: MenuSection }) => {
    const isMenuActive = section.items.some(item => isActive(item.path));
    const isOpen = openMenus[section.title] || isMenuActive;

    return (
      <Collapsible
        open={isOpen}
        className="mb-2"
      >
        <CollapsibleTrigger 
          className={`flex items-center w-[15vw] p-3 hover:bg-blue-50 rounded-lg transition-all duration-200
            ${isMenuActive ? 'bg-blue-50 text-blue-600' : 'text-gray-700'}`}
          onClick={() => toggleMenu(section.title)}
        >
          <div className="flex items-center flex-1 space-x-3">
            {section.icon}
            <span className="font-medium">{section.title}</span>
          </div>
          {isOpen ? (
            <ChevronDown className="h-4 w-4 transition-transform duration-200" />
          ) : (
            <ChevronRight className="h-4 w-4 transition-transform duration-200" />
          )}
        </CollapsibleTrigger>
        <CollapsibleContent className="mt-1">
          <div className="pl-8 space-y-1">
            {section.items.map(item => (
              <MenuItem key={item.name} item={item} />
            ))}
          </div>
        </CollapsibleContent>
      </Collapsible>
    );
  };

  return (
    <div className="flex flex-col h-full bg-white border-r border-gray-200">
      <div className="p-4 border-b border-gray-200">
          <Link to="/profile">
        <div className="h-8 flex items-center space-x-2">
          <img 
            src={logo} 
            alt="Logo" 
            className="h-full object-contain"
          />
          <span className="font-semibold text-xl text-gray-800">Dashboard</span>
        </div>
          </Link>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        <nav className="space-y-2">
          {menuItems.map(section => (
            <MenuSection key={section.title} section={section} />
          ))}
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;