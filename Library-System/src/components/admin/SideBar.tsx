import React from "react"
import { Link, useLocation } from "react-router-dom"
import {
  BookOpen,
  LayoutDashboard,
  Users,
  PieChart,
  LogOut,
  Library,
} from "lucide-react"

// 1. استدعاء مكونات Shadcn الأصلية (لاحظ المسار النسبي ..)
import {
  Sidebar, // <-- ده المكون الأصلي من Shadcn
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
} from "@/components/ui/sidebar"

// 2. استدعاء الـ Avatar (تأكد إنك عملت npx shadcn@latest add avatar)
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

// 3. تغيير اسم الدالة هنا لـ SideBar
export function SideBar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const location = useLocation();

  const items = [
    { title: "Books Dashboard", url: "/admin", icon: LayoutDashboard },
    { title: "User Accounts", url: "/admin/users", icon: Users },
    { title: "Statistics", url: "/admin/stats", icon: PieChart },
  ]

  const publicItems = [
    { title: "Catalog (Home)", url: "/", icon: BookOpen },
    { title: "My Borrowed Books", url: "/my-books", icon: Library },
  ]

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link to="/">
                <img src="/src/assets/Logo.png" alt="Logo" className="h-8 w-8" />
                <div className="grid flex-1 text-left text-sm leading-tight">
                    <span>3la Allah</span>
                    <span className="truncate text-xs">Admin Panel</span>
                </div>
              </Link>
            </SidebarMenuButton>
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
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">Admin</span>
                <span className="truncate text-xs">admin@library.com</span>
              </div>
              <LogOut className="ml-auto size-4" />
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}