import { useState } from 'react'
import { ChevronDown, Dot } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { DropdownMenuArrow } from '@radix-ui/react-dropdown-menu'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from '@/components/ui/tooltip'
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuSeparator
} from '@/components/ui/dropdown-menu'
import { Link, useLocation } from 'react-router-dom'

type Submenu = {
  href: string
  label: string
  active?: boolean
}

interface CollapseMenuButtonProps {
  label: string
  active: boolean
  submenus: Submenu[]
  isOpen: boolean | undefined
}

const CollapseMenuButton = ({ label, active, submenus, isOpen }: CollapseMenuButtonProps) => {
  const location = useLocation()
  const isSubmenuActive = submenus.some((submenu) =>
    submenu.active == undefined ? submenu.href === location.pathname : submenu.active
  )
  const [isCollapsed, setIsCollapsed] = useState<boolean>(isSubmenuActive)

  return isOpen ? (
    <Collapsible open={isCollapsed} onOpenChange={setIsCollapsed} className="w-full">
      <CollapsibleTrigger className="[&[data-state=open]>div>div>svg]:rotate-180 mb-1" asChild>
        {/* sidebar dropdown */}
        <Button variant={active ? 'active' : 'default'} className="justify-start w-full h-10">
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center">
              <p
                className={cn(
                  'max-w-[150px] truncate',
                  isOpen ? 'translate-x-0 opacity-100' : '-translate-x-96 opacity-0'
                )}
              >
                {label}
              </p>
            </div>
            <div
              className={cn('whitespace-nowrap', isOpen ? 'translate-x-0 opacity-100' : '-translate-x-96 opacity-0')}
            >
              <ChevronDown size={18} className="transition-transform duration-200" />
            </div>
          </div>
        </Button>
      </CollapsibleTrigger>
      <CollapsibleContent className="overflow-hidden data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down">
        {/* sidebar dropdown content */}
        {submenus.map(({ href, label, active }, index) => (
          <Button
            key={index}
            variant={(active === undefined && location.pathname === href) || active ? 'active' : 'default'}
            className="justify-start w-full h-10 mb-1"
            asChild
          >
            <Link to={href}>
              <span className="ml-2 mr-4">
                <Dot size={18} />
              </span>
              <p
                className={cn(
                  'max-w-[170px] truncate',
                  isOpen ? 'translate-x-0 opacity-100' : '-translate-x-96 opacity-0'
                )}
              >
                {label}
              </p>
            </Link>
          </Button>
        ))}
      </CollapsibleContent>
    </Collapsible>
  ) : (
    <DropdownMenu>
      <TooltipProvider disableHoverableContent>
        <Tooltip delayDuration={100}>
          <TooltipTrigger asChild>
            <DropdownMenuTrigger asChild>
              <Button variant={active ? 'secondary' : 'ghost'} className="justify-start w-full h-10 mb-1">
                <div className="flex items-center justify-between w-full">
                  <div className="flex items-center">
                    <p className={cn('max-w-[200px] truncate', isOpen === false ? 'opacity-0' : 'opacity-100')}>
                      {label}
                    </p>
                  </div>
                </div>
              </Button>
            </DropdownMenuTrigger>
          </TooltipTrigger>
          <TooltipContent side="right" align="start" alignOffset={2}>
            {label}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <DropdownMenuContent side="right" sideOffset={25} align="start">
        <DropdownMenuLabel className="max-w-[190px] truncate">{label}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {submenus.map(({ href, label, active }, index) => (
          <DropdownMenuItem key={index} asChild>
            <Link
              className={`cursor-pointer ${((active === undefined && location.pathname === href) || active) && 'active'}`}
              to={href}
            >
              <p className="max-w-[180px] truncate">{label}</p>
            </Link>
          </DropdownMenuItem>
        ))}
        <DropdownMenuArrow className="fill-border" />
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default CollapseMenuButton
