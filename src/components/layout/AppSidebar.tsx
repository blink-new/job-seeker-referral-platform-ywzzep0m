import { useState } from 'react'
import { 
  Search, 
  Users, 
  FileText, 
  Video, 
  BarChart3, 
  Settings,
  Briefcase,
  UserPlus,
  Home
} from 'lucide-react'
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
} from '@/components/ui/sidebar'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'

interface AppSidebarProps {
  currentPage: string
  onPageChange: (page: string) => void
  user?: any
}

const menuItems = [
  {
    title: 'Dashboard',
    icon: Home,
    id: 'dashboard'
  },
  {
    title: 'Job Search',
    icon: Search,
    id: 'jobs'
  },
  {
    title: 'Referrals',
    icon: UserPlus,
    id: 'referrals'
  },
  {
    title: 'Contacts',
    icon: Users,
    id: 'contacts'
  },
  {
    title: 'Resume Builder',
    icon: FileText,
    id: 'resume'
  },
  {
    title: 'AI Video Studio',
    icon: Video,
    id: 'video'
  },
  {
    title: 'Applications',
    icon: Briefcase,
    id: 'applications'
  },
  {
    title: 'Analytics',
    icon: BarChart3,
    id: 'analytics'
  }
]

export function AppSidebar({ currentPage, onPageChange, user }: AppSidebarProps) {
  return (
    <Sidebar className="border-r border-border/40">
      <SidebarHeader className="p-6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-amber-500 flex items-center justify-center">
            <Briefcase className="w-4 h-4 text-white" />
          </div>
          <div>
            <h2 className="font-semibold text-lg">JobSeeker</h2>
            <p className="text-xs text-muted-foreground">Referral Platform</p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton
                    onClick={() => onPageChange(item.id)}
                    isActive={currentPage === item.id}
                    className="w-full justify-start"
                  >
                    <item.icon className="w-4 h-4" />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4">
        {user && (
          <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
            <Avatar className="w-8 h-8">
              <AvatarImage src={user.avatar} />
              <AvatarFallback>
                {user.displayName?.charAt(0) || user.email?.charAt(0) || 'U'}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">
                {user.displayName || 'User'}
              </p>
              <p className="text-xs text-muted-foreground truncate">
                {user.email}
              </p>
            </div>
          </div>
        )}
      </SidebarFooter>
    </Sidebar>
  )
}