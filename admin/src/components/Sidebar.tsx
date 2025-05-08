import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  ChevronDown,
  ChevronRight,
  Building2,
  Users,
  BookOpen,
  GraduationCap,
  Settings,
  IndianRupee,
  Menu,
  X
} from 'lucide-react';
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
  const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({});
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  const menuItems: MenuSection[] = [
    {
      title: "Students",
      path: "/students",
      icon: <Users className="h-5 w-5" />,
      items: [
        { name: "Student Admission", path: "/admission" },
        { name: "Upload Documents", path: "/upload-documents" },
        { name: "Fee Payment", path: "/fee-payment" },
        { name: "All Students", path: "/all-students" },
        // { name: "Student Details", path: "/student-details" },
        // { name: "Result Upload", path: "/all-students" },
      ]
    },
    {
      title: "Institutes",
      path: "/institutes",
      icon: <Building2 className="h-5 w-5" />,
      items: [
        { name: "Institute Registration", path: "/institute-registration" },
        { name: "Upload Documents", path: "/institute-upload-documents" },
        { name: "Fee Payment", path: "/institute-fee-payment" },
        { name: "All Institutes", path: "/all-institutes" },
        // { name: "Institute Details", path: "/institute-details" },
      ]
    },
    {
      title: "Courses",
      path: "/courses",
      icon: <BookOpen className="h-5 w-5" />,
      items: [
        { name: "Create Course", path: "/create-course" },
        // { name: "Course Details", path: "/course-details" },
      ]
    },
    {
      title: "Subjects",
      path: "/subjects",
      icon: <GraduationCap className="h-5 w-5" />,
      items: [
        { name: "Create Subject", path: "/create-subject" },
        // { name: "Subject Details", path: "/subject-details" },
      ]
    },
    {
      title: "Payments",
      path: "/payments",
      icon: < IndianRupee className="h-5 w-5" />,
      items: [
        { name: "All Payments", path: "/all-payments" },
      ]
    },
    {
      title: "Others",
      path: "/others",
      icon: <Settings className="h-5 w-5" />,
      items: [
        { name: "Enquiry", path: "/enquiry" },
        { name: "Notice Update", path: "/notice-update" },
        { name: "Change Password", path: "/change-password" },

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
      onClick={() => {
        navigate(item.path);
        setIsMobileSidebarOpen(false);
      }}
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
          className={`flex items-center w-full p-3 hover:bg-blue-50 rounded-lg transition-all duration-200
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
    <>
      {/* Mobile Hamburger Button */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 bg-white p-2 rounded-lg shadow-md "
        onClick={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
      >
        {isMobileSidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>

      {/* Overlay for Mobile */}
      {isMobileSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setIsMobileSidebarOpen(false)}
        />
      )}

      {/* Sidebar - Desktop and Mobile */}
      <div
        className={`
          fixed top-0 left-0 h-full bg-white border-r border-gray-200 
          transform transition-transform duration-300 z-50
          md:relative md:translate-x-0
          ${isMobileSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        <div className="p-4 border-b border-gray-200 flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2">
            <img
              src={logo}
              alt="Logo"
              className="h-8 object-contain"
            />
            <span className="font-semibold text-xl text-gray-800">Dashboard</span>
          </Link>
          <button
            className="md:hidden"
            onClick={() => setIsMobileSidebarOpen(false)}
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 ">
          <nav className="space-y-2">
            {menuItems.map(section => (
              <MenuSection key={section.title} section={section} />
            ))}
          </nav>
        </div>
      </div>
    </>
  );
};

export default Sidebar;