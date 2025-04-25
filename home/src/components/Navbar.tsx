import * as React from "react"
import { Link } from "react-router-dom"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "./ui/navigation-menu"

import { cn } from "../lib/utils"

import { aboutDropdownItems, councilItems, recognitionDropdownItems, programDropdownItems, accreditedInstitutes, admissionItems } from "../data/navbarItem"


export function Navbar() {



  return (
    <div className=" flex-col z-[100] md:mt-[80px] hidden lg:flex">
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