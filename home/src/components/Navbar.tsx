import * as React from "react"
import { Link } from "react-router-dom"
import {  Menu, ChevronDown } from "lucide-react"
import { Button } from "./ui/button"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "./ui/navigation-menu"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./ui/collapsible"
import { cn } from "../lib/utils"

const aboutDropdownItems = [
  {
    title: "Profile",
    href: "/board-profile",
    description: "Explore our world-class facilities.",
  },
  {
    title: "Chairman Message",
    href: "/chairman-message",
    description: "Learn about our institution's rich history and heritage.",
  },
  {
    title: "COE's Message",
    href: "/coe",
    description: "Discover our goals and what drives us forward.",
  },
  {
    title: "Mission & Vission",
    href: "/mission-vision",
    description: "Meet our experienced leadership team.",
  },
]
 
const recognitionDropdownItems = [
  {
    title: "Membership / Accreditation",
    href: "/membership-accreditation",
    description: "Explore our memberships and accreditations that enhance our credibility.",
  },
  {
    title: "Recognitions",
    href: "/recognitions",
    description: "Learn about the recognitions we have received for our excellence.",
  },
  {
    title: "Constitutional Reliability",
    href: "/constitutional-reliability",
    description: "Understand our commitment to constitutional reliability in education.",
  },
  {
    title: "Autonomous Institution",
    href: "/autonomous-institution",
    description: "Discover our status as an autonomous institution and what it means for our students.",
  },
  {
    title: "ISO Certification",
    href: "/iso-certification",
    description: "Find out about our ISO certification and its significance.",
  },
]

const programDropdownItems = [
  {
    title: "Middle Years Programme",
    href: "/programs/middle-years",
    description: "Business and management programs.",
  },
  {
    title: "Upper Years Programme",
    href: "/programs/upper-years",
    description: "Pure and applied science courses.",
  },
  {
    title: "Certificate Programme",
    href: "/programs/certificate",
    description: "Legal studies and courses.",
  },
  {
    title: "Diploma Programme",
    href: "/programs/diploma",
    description: "Liberal arts and humanities.",
  },
  {
    title: "UG Programme",
    href: "/programs/ug",
    description: "Medical and healthcare programs.",
  },
  {
    title: "PG Programme",
    href: "/programs/pg",
    description: "Medical and healthcare programs.",
  },
  {
    title: "Research Programme",
    href: "/programs/research",
    description: "Legal studies and courses.",
  },

]

const accreditedInstitutes = [
  {
    title: "Find Accredited",
    href: "/institutes/partners",
    description: "Our network of partner institutions.",
  },
  {
    title: "Partners Program",
    href: "/institutes/affiliated",
    description: "Colleges affiliated with our institution.",
  },
  {
    title: "School Accreditation",
    href: "/institutes/affiliated",
    description: "Colleges affiliated with our institution.",
  },
  {
    title: "Online Accreditation Form",
    href: "/institutes/research",
    description: "Specialized research institutions.",
  },
  {
    title: "Offline Accreditation Form",
    href: "/institutes/training",
    description: "Professional development centers.",
  },
]

const admissionItems = [
  {
    title: "Admission Process",
    href: "/admission/process",
    description: "Step-by-step guide to admission.",
  },
]

const councilItems = [
  {
    title: "Governing Body",
    href: "/governing-body",
    description: "Step-by-step guide to admission.",
  },
  {
    title: "Executive Committee",
    href: "/executive-committee",
    description: "Eligibility and documentation requirements.",
  },
  {
    title: "Powers of SBCODL",
    href: "/powers-of-sbcodl",
    description: "Eligibility and documentation requirements.",
  },
  {
    title: "Bye-Laws & Rules",
    href: "/bye-laws-rules",
    description: "Eligibility and documentation requirements.",
  },
  {
    title: "Prospectus",
    href: "/prospectus",
    description: "Eligibility and documentation requirements.",
  },
]

export function Navbar() {
    //@ts-ignore
    const [isOpen, setIsOpen] = React.useState(false)
    // const [activeDropdown, setActiveDropdown] = React.useState<string | null>(null)
  
    const MobileDropdownMenu = ({ 
      title, 
      items 
    }: { 
      title: string; 
      items: Array<{ title: string; href: string; description: string }> 
    }) => {
      const [isOpen, setIsOpen] = React.useState(false)
      
      return (
        <Collapsible open={isOpen} onOpenChange={setIsOpen}>
          
          <CollapsibleTrigger className="flex w-full items-center justify-between py-2 px-4 hover:bg-accent">
            <span>{title}</span>
            <ChevronDown className={cn("h-4 w-4 transition-transform", {
              "transform rotate-180": isOpen,
            })} />
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className="flex flex-col space-y-2 px-6 py-2">
              {items.map((item) => (
                <Link
                  key={item.title}
                  to={item.href}
                  className="text-sm hover:text-primary py-1"
                  onClick={() => setIsOpen(false)}
                >
                  {item.title}
                </Link>
              ))}
            </div>
          </CollapsibleContent>
        </Collapsible>
      )
    }
  
    return (
      <div className="flex flex-col pt-[5.5vw] z-[10]">
        <NavigationMenu className="container mx-auto hidden lg:block">
     
          <NavigationMenuList>

            <NavigationMenuItem>
              <Link to="/">
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Home
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
           
  
            <NavigationMenuItem>
              <NavigationMenuTrigger>About</NavigationMenuTrigger>
              <NavigationMenuContent >
                <ul className="grid w-[400px] md:w-[200px] md:grid-cols-1">
                  {aboutDropdownItems.map((item) => (
                    <ListItem key={item.title} title={item.title} href={item.href}>
                      {item.description}
                    </ListItem>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>

            
            <NavigationMenuItem>
            <NavigationMenuTrigger>Council</NavigationMenuTrigger>
            <NavigationMenuContent className="">
              <ul className="grid w-[400px] md:w-[200px] md:grid-cols-1 ">
                {councilItems.map((item) => (
                  <ListItem
                    key={item.title}
                    title={item.title}
                    href={item.href}
                    >
                    {item.description}
                  </ListItem>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuTrigger>Recognition</NavigationMenuTrigger>
            <NavigationMenuContent className="">
              <ul className="grid w-[400px] md:w-[200px] md:grid-cols-1 ">
                {recognitionDropdownItems.map((item) => (
                  <ListItem
                    key={item.title}
                    title={item.title}
                    href={item.href}
                    >
                    {item.description}
                  </ListItem>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuTrigger>Programmes</NavigationMenuTrigger>
            <NavigationMenuContent className="">
              <ul className="grid w-[400px] md:w-[200px] md:grid-cols-1 ">
                {programDropdownItems.map((item) => (
                  <ListItem
                    key={item.title}
                    title={item.title}
                    href={item.href}
                    >
                    {item.description}
                  </ListItem>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <Link to="/faculty">
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                Faculty
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>

        
          <NavigationMenuItem>
            <NavigationMenuTrigger>Accredited Institutes</NavigationMenuTrigger>
            <NavigationMenuContent className="">
              <ul className="grid w-[400px] md:w-[200px] md:grid-cols-1">
                {accreditedInstitutes.map((item) => (
                  <ListItem
                    key={item.title}
                    title={item.title}
                    href={item.href}
                  >
                    {item.description}
                  </ListItem>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuTrigger>Admission</NavigationMenuTrigger>
            <NavigationMenuContent >
              <ul className="grid w-[400px]  md:w-[200px] md:grid-cols-1 ">
                {admissionItems.map((item) => (
                  <ListItem
                    key={item.title}
                    title={item.title}
                    href={item.href}
                  >
                    {item.description}
                  </ListItem>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <Link to="/contact-us">
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                Contact Us
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>

          </NavigationMenuList>

        </NavigationMenu>
  
        {/* Mobile Navigation */}
        <div className="lg:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button 
                variant="ghost" 
                className="fixed top-4 right-4 z-50"
                size="icon"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] sm:w-[400px]">
              <SheetHeader>
                <SheetTitle>Menu</SheetTitle>
              </SheetHeader>
              <div className="flex flex-col mt-4 space-y-2">
                <Link 
                  to="/" 
                  className="px-4 py-2 hover:bg-accent"
                  onClick={() => setIsOpen(false)}
                >
                  Home
                </Link>
                
                <MobileDropdownMenu title="About" items={aboutDropdownItems} />
                <MobileDropdownMenu title="Programmes" items={programDropdownItems} />
                
                <Link 
                  to="/boarding" 
                  className="px-4 py-2 hover:bg-accent"
                  onClick={() => setIsOpen(false)}
                >
                  Boarding
                </Link>
                
                <Link 
                  to="/port-activity" 
                  className="px-4 py-2 hover:bg-accent"
                  onClick={() => setIsOpen(false)}
                >
                  Port Activity
                </Link>
                
                <MobileDropdownMenu 
                  title="Accredited Institutes" 
                  items={accreditedInstitutes} 
                />
                <MobileDropdownMenu title="Admission" items={admissionItems} />
                
                <Link 
                  to="/contact" 
                  className="px-4 py-2 hover:bg-accent"
                  onClick={() => setIsOpen(false)}
                >
                  Contact Us
                </Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    )
  }
  
  const ListItem = React.forwardRef<
    React.ElementRef<"a">,
    React.ComponentPropsWithoutRef<"a">
  >(({ className, title, children, ...props }, ref) => {
    return (
      <li>
        <NavigationMenuLink asChild>
          <a
            ref={ref}
            className={cn(
              "block select-none rounded-sm p-2 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-white focus:bg-white focus:text-white ",
              className
            )}
            {...props}
          >
            <div className="text-sm font-medium leading-none py-2">
                {title}
            </div>
          </a>
        </NavigationMenuLink>
      </li>
    )
  })
  ListItem.displayName = "ListItem"