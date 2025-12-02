import React from "react"
import { Link, useLocation } from "react-router-dom"
import {
  LayoutDashboard,
  Users,
  PieChart,
  LogOut,
  PanelLeft,
} from "lucide-react"
import { ModeToggle } from "@/components/mode-toggle";

import { Button } from "@/components/ui/button"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface SideBarProps extends React.ComponentProps<typeof Sidebar> {
  onLogout: () => void;
}

export function SideBar({ onLogout, ...props }: SideBarProps) {
  const location = useLocation();
  const { toggleSidebar, state } = useSidebar(); 

  const items = [
    { title: "Books Dashboard", url: "/admin", icon: LayoutDashboard },
    { title: "User Accounts", url: "/admin/users", icon: Users },
    { title: "Statistics", url: "/admin/stats", icon: PieChart },
  ]

  return (
    <Sidebar collapsible="icon" {...props}>
      
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <div className={`flex items-center w-full ${state === 'collapsed' ? 'justify-center' : 'justify-between'}`}>
              
              <div className="group-data-[collapsible=icon]:hidden">
                <SidebarMenuButton size="lg" asChild>
                  <Link to="/">
                    <img src="/src/assets/Logo.png" alt="Logo" className="h-8 w-8" />
                    <div className="grid flex-1 text-left text-sm leading-tight">
                        <span className="font-bold">3la Allah</span>
                        <span className="truncate text-xs">Admin Panel</span>
                    </div>
                  </Link>
                </SidebarMenuButton>
              </div>

              <Button 
                onClick={toggleSidebar} 
                variant="ghost" 
                size="icon"
                className="h-7 w-7" 
                title={state === "collapsed" ? "Open Sidebar" : "Close Sidebar"}
              >
                <PanelLeft className="h-4 w-4" />
              </Button>

            </div>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Management</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={location.pathname === item.url}>
                    <Link to={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg">
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage src="https://github.com/shadcn.png" alt="Admin" />
                <AvatarFallback>AD</AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight group-data-[collapsible=icon]:hidden">
                <span className="truncate font-semibold">Admin</span>
                <span className="truncate text-xs">admin@library.com</span>
              </div>
              <div className="group-data-[collapsible=icon]:hidden flex items-center gap-1 ml-auto">
                 <ModeToggle />
                 <LogOut 
                    onClick={onLogout}
                    className="size-4"
                  />
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}


