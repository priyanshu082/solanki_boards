import { Button } from "./ui/button"
// import { ModeToggle } from '@repo/ui/mode-toggle'
import { IoReorderThree } from "react-icons/io5";
import logo from "../assets/images/logo.png"
import { Link } from 'react-router-dom'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "./ui/collapsible"
import { ChevronDown } from "lucide-react"
import { cn } from "../lib/utils"
import React from "react"
import { aboutDropdownItems, programDropdownItems, accreditedInstitutes, admissionItems, councilItems, recognitionDropdownItems } from "../data/navbarItem"
// import { ModeToggle } from "./ui/mode-toggle"

const FixedNavbar = () => {
  const [openMenus, setOpenMenus] = React.useState<{ [key: string]: boolean }>({})
  const [sheetOpen, setSheetOpen] = React.useState(false)

  const MobileDropdownMenu = ({
    title,
    items
  }: {
    title: string;
    items: Array<{ title: string; href: string; description: string }>
  }) => {

    return (
      <Collapsible
        open={openMenus[title]}
        onOpenChange={(open) => {
          setOpenMenus(prev => ({ ...prev, [title]: open }))
        }}
      >
        <CollapsibleTrigger className="flex w-full items-center justify-between py-2 px-4 hover:bg-accent">
          <span>{title}</span>
          <ChevronDown className={cn("h-4 w-4 transition-transform", {
            "transform rotate-180": openMenus[title],
          })} />
        </CollapsibleTrigger>
        <CollapsibleContent>
          <div className="flex flex-col space-y-2 px-6 py-2">
            {items.map((item) => (
              <Link
                key={item.title}
                to={item.href}
                className="text-sm hover:text-primary hover:bg-white rounded-md p-2"
                onClick={() => {
                  setOpenMenus(prev => ({ ...prev, [title]: false }))
                  setSheetOpen(false)
                }}
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
    <header className=" bg-white fixed md:top-0 md:left-0 md:right-0 z-[102] w-full">
      <div className="flex w-full py-2 flex-col lg:flex-row items-center justify-between gap-4">
        <div className="flex flex-col lg:flex-row items-center gap-4">

          <Link to="/">
            <div className="flex flex-col lg:flex-row items-center text-2xl font-bold">
              <img src={logo} alt="Logo" className="h-16 w-20 mr-0" />
            </div>

          </Link>
          <div className="text-xs lg:text-xl xl:text-2xl font-bold text-secondary text-center">
            SOLANKI BROTHERS COUNCIL FOR OPEN AND DISTANCE LEARNING
          </div>
        </div>



        <div className=" gap-2 sm:gap-4 px-4 flex flex-row-reverse justify-between w-full lg:w-fit ">

          <div className="flex justify-center gap-2 sm:gap-4 ">

            <Link to="https://student.sbiea.co.in/login">
              <Button variant="secondary" className="text-sm">
                Student Login
              </Button>
            </Link>
            <Link to="https://institution.sbiea.co.in/login">
              <Button variant="secondary" className="text-sm">
                Institute Login
              </Button>
            </Link>



          </div>

          <div className="lg:hidden flex justify-center items-center z-[1001]">
            <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
              <SheetTrigger asChild>
                <IoReorderThree className="text-primary h-[30px] w-[30px]" />
              </SheetTrigger>
              <SheetContent side="left" className="w-[300px] sm:w-[400px] z-[1002]">
                <SheetHeader>
                  <SheetTitle>Menu</SheetTitle>
                </SheetHeader>
                <div className="flex flex-col mt-4 space-y-2">
                  <Link
                    to="/"
                    className="px-4 py-2 hover:bg-accent"
                    onClick={() => {
                      setOpenMenus({})
                      setSheetOpen(false)
                    }}
                  >
                    Home
                  </Link>

                  <MobileDropdownMenu title="About" items={aboutDropdownItems} />
                  <MobileDropdownMenu title="Council" items={councilItems} />
                  <MobileDropdownMenu title="Recognition" items={recognitionDropdownItems} />
                  <MobileDropdownMenu title="Programmes" items={programDropdownItems} />

                  <Link
                    to="/faculty"
                    className="px-4 py-2 hover:bg-accent"
                    onClick={() => {
                      setOpenMenus({})
                      setSheetOpen(false)
                    }}
                  >
                    Faculty
                  </Link>

                  <MobileDropdownMenu
                    title="Accredited Institutes"
                    items={accreditedInstitutes}
                  />
                  <MobileDropdownMenu title="Admission" items={admissionItems} />

                  <Link
                    to="/contact-us"
                    className="px-4 py-2 hover:bg-accent"
                    onClick={() => {
                      setOpenMenus({})
                      setSheetOpen(false)
                    }}
                  >
                    Contact Us
                  </Link>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>


      </div>
    </header>

  )
}

export default FixedNavbar