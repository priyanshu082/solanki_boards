import { useState } from 'react';
import logo from "../assets/logo.png"
import { 
  NavigationMenu, 
  NavigationMenuContent, 
  NavigationMenuItem, 
  NavigationMenuLink, 
  NavigationMenuList, 
  NavigationMenuTrigger 
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from "@/components/ui/accordion";
import { Menu } from "lucide-react";
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="relative flex items-center justify-between p-4 bg-gradient-to-r from-slate-100 to-slate-200 text-slate-800 shadow-md z-50">
      {/* Logo and Heading Section */}
      <div className="flex items-center flex-col space-x-2 justify-center">
        <img 
          src={logo} 
          alt="Logo" 
          className="h-10 w-12 " 
        />
        <h1 className="text-sm font-bold text-blue-950">SBCODL</h1>
      </div>

      {/* Desktop Navigation */}
      <div className="hidden md:flex space-x-2 items-center">
        <NavigationMenu>
          <NavigationMenuList className="flex space-x-4">
            <NavigationMenuItem>
              <Link to="/">
              <Button variant="ghost" className="text-slate-700 hover:bg-slate-200">Dashboard</Button>
              </Link>
            </NavigationMenuItem>
            
            <NavigationMenuItem>
              <NavigationMenuTrigger className="text-slate-700 hover:bg-slate-200">I-Card</NavigationMenuTrigger>
              <NavigationMenuContent className="z-50 bg-white text-slate-800 shadow-lg rounded-md">
                <div className="p-2 space-y-2 w-[15vw] items-center">
                  <Link to="/id-card">
                  <NavigationMenuLink className="block  hover:bg-slate-100 p-2 rounded">View I-Card</NavigationMenuLink>
                  </Link>
                  <NavigationMenuLink className="block hover:bg-slate-100 p-2 rounded">Download I-Card</NavigationMenuLink>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>
            
            <NavigationMenuItem>
              <NavigationMenuTrigger className="text-slate-700 hover:bg-slate-200">Examination</NavigationMenuTrigger>
              <NavigationMenuContent className="z-50 bg-white text-slate-800 shadow-lg rounded-md">
                <div className="p-2 space-y-2 w-[15vw]">
                  <NavigationMenuLink className="block hover:bg-slate-100 p-2 rounded">Exam Schedule</NavigationMenuLink>
                  <NavigationMenuLink className="block hover:bg-slate-100 p-2 rounded">Previous Papers</NavigationMenuLink>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>
            
            <NavigationMenuItem>
              <NavigationMenuTrigger className="text-slate-700 hover:bg-slate-200">Notice</NavigationMenuTrigger>
              <NavigationMenuContent className="z-50 bg-white text-slate-800 shadow-lg rounded-md">
                <div className="p-2 space-y-2 w-[15vw]">
                  <NavigationMenuLink className="block hover:bg-slate-100 p-2 rounded">Recent Notices</NavigationMenuLink>
                  <NavigationMenuLink className="block hover:bg-slate-100 p-2 rounded">Archives</NavigationMenuLink>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>
            
            <NavigationMenuItem>
              <Button variant="ghost" className="text-slate-700 hover:bg-slate-200">Result</Button>
            </NavigationMenuItem>
            
            <NavigationMenuItem>
              <Button variant="destructive" className="bg-red-500 hover:bg-red-600 text-white">Logout</Button>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>

      {/* Mobile Navigation Toggle */}
      <div className="md:hidden">
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="text-slate-700 border-slate-300 hover:bg-slate-200">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="z-[9999] bg-white">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="dashboard" className="border-b">
                <Button variant="ghost" className="w-full justify-start text-slate-800 hover:bg-slate-100">Dashboard</Button>
              </AccordionItem>
              
              <AccordionItem value="i-card" className="border-b">
                <AccordionTrigger className="text-slate-800 hover:bg-slate-100">I-Card</AccordionTrigger>
                <AccordionContent>
                  <div className="flex flex-col space-y-2">
                    <Button variant="ghost" className="w-full text-slate-700 hover:bg-slate-100">View I-Card</Button>
                    <Button variant="ghost" className="w-full text-slate-700 hover:bg-slate-100">Download I-Card</Button>
                  </div>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="examination" className="border-b">
                <AccordionTrigger className="text-slate-800 hover:bg-slate-100">Examination</AccordionTrigger>
                <AccordionContent>
                  <div className="flex flex-col space-y-2">
                    <Button variant="ghost" className="w-full text-slate-700 hover:bg-slate-100">Exam Schedule</Button>
                    <Button variant="ghost" className="w-full text-slate-700 hover:bg-slate-100">Previous Papers</Button>
                  </div>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="notice" className="border-b">
                <AccordionTrigger className="text-slate-800 hover:bg-slate-100">Notice</AccordionTrigger>
                <AccordionContent>
                  <div className="flex flex-col space-y-2">
                    <Button variant="ghost" className="w-full text-slate-700 hover:bg-slate-100">Recent Notices</Button>
                    <Button variant="ghost" className="w-full text-slate-700 hover:bg-slate-100">Archives</Button>
                  </div>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="result" className="border-b">
                <Button variant="ghost" className="w-full justify-start text-slate-800 hover:bg-slate-100">Result</Button>
              </AccordionItem>
              
              <AccordionItem value="logout">
                <Button variant="destructive" className="w-full bg-red-500 hover:bg-red-600 text-white">Logout</Button>
              </AccordionItem>
            </Accordion>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
};

export default Navbar;