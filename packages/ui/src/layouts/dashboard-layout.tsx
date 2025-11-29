"use client";

import * as React from "react";
import { Bot, Settings, Shield, User, LogOut, ChevronDown } from "lucide-react";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarInset,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
    SidebarProvider,
    SidebarTrigger,
} from "../sidebar";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "../collapsible";
import { Avatar, AvatarFallback } from "../avatar";
import { Button } from "../button";
import { Badge } from "../badge";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
    DropdownMenuSeparator,
} from "../dropdown-menu";

export interface MenuItem {
    id: string;
    label: string;
    icon: React.ElementType;
    onClick?: () => void;
    isActive?: boolean;
    subItems?: {
        id: string;
        label: string;
        onClick?: () => void;
        isActive?: boolean;
    }[];
}

interface DashboardLayoutProps {
    children: React.ReactNode;
    menuItems: MenuItem[];
    user?: {
        name: string;
        role: string;
        initials: string;
    };
    title: string;
    isSuperAdmin?: boolean;
    onAdminClick?: () => void;
    isAdminActive?: boolean;
    onProfileClick?: () => void;
    onLogout?: () => void;
}

export function DashboardLayout({
    children,
    menuItems,
    user = { name: "John Doe", role: "User", initials: "JD" },
    title,
    isSuperAdmin = false,
    onAdminClick,
    isAdminActive = false,
    onProfileClick,
    onLogout,
}: DashboardLayoutProps) {
    const [openMenus, setOpenMenus] = React.useState<Record<string, boolean>>({});

    const toggleMenu = (menuId: string) => {
        setOpenMenus(prev => ({ ...prev, [menuId]: !prev[menuId] }));
    };

    return (
        <SidebarProvider>
            <div className="flex min-h-screen w-full bg-neutral-50 dark:bg-neutral-900">
                <Sidebar collapsible="icon">
                    <SidebarHeader className="border-b border-neutral-200 dark:border-neutral-800 p-4">
                        <div className="flex items-center gap-3 group-data-[collapsible=icon]:justify-center">
                            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-violet-600 to-purple-600 shadow-lg shadow-violet-500/30 shrink-0">
                                <Bot className="h-5 w-5 text-white" />
                            </div>
                            <h1 className="font-semibold text-lg truncate group-data-[collapsible=icon]:hidden">
                                RealtyEaseAI
                            </h1>
                        </div>
                    </SidebarHeader>

                    <SidebarContent>
                        <SidebarMenu className="p-2">
                            {isSuperAdmin && (
                                <SidebarMenuItem>
                                    <SidebarMenuButton
                                        onClick={onAdminClick}
                                        isActive={isAdminActive}
                                        className="w-full"
                                        tooltip="Super Admin"
                                    >
                                        <Shield className="h-4 w-4 shrink-0" />
                                        <span className="flex-1 truncate group-data-[collapsible=icon]:hidden">
                                            Super Admin
                                        </span>
                                        <Badge className="ml-auto group-data-[collapsible=icon]:hidden bg-red-600 hover:bg-red-700">
                                            Admin
                                        </Badge>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            )}
                            {menuItems.map((item) => {
                                if (item.subItems && item.subItems.length > 0) {
                                    return (
                                        <Collapsible
                                            key={item.id}
                                            open={openMenus[item.id]}
                                            onOpenChange={() => toggleMenu(item.id)}
                                            className="group/collapsible"
                                        >
                                            <SidebarMenuItem>
                                                <CollapsibleTrigger asChild>
                                                    <SidebarMenuButton
                                                        className="w-full"
                                                        tooltip={item.label}
                                                    >
                                                        <item.icon className="h-4 w-4 shrink-0" />
                                                        <span className="flex-1 truncate group-data-[collapsible=icon]:hidden">
                                                            {item.label}
                                                        </span>
                                                        <ChevronDown className="ml-auto h-4 w-4 shrink-0 transition-transform duration-200 group-data-[collapsible=icon]:hidden group-data-[state=open]/collapsible:rotate-180" />
                                                    </SidebarMenuButton>
                                                </CollapsibleTrigger>
                                                <CollapsibleContent>
                                                    <SidebarMenuSub>
                                                        {item.subItems.map((subItem) => (
                                                            <SidebarMenuSubItem key={subItem.id}>
                                                                <SidebarMenuSubButton
                                                                    onClick={subItem.onClick}
                                                                    isActive={subItem.isActive}
                                                                >
                                                                    <span>{subItem.label}</span>
                                                                </SidebarMenuSubButton>
                                                            </SidebarMenuSubItem>
                                                        ))}
                                                    </SidebarMenuSub>
                                                </CollapsibleContent>
                                            </SidebarMenuItem>
                                        </Collapsible>
                                    );
                                }

                                return (
                                    <SidebarMenuItem key={item.id}>
                                        <SidebarMenuButton
                                            onClick={item.onClick}
                                            isActive={item.isActive}
                                            className="w-full"
                                            tooltip={item.label}
                                        >
                                            <item.icon className="h-4 w-4 shrink-0" />
                                            <span className="flex-1 truncate group-data-[collapsible=icon]:hidden">
                                                {item.label}
                                            </span>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                );
                            })}
                        </SidebarMenu>
                    </SidebarContent>

                    <SidebarFooter className="border-t border-neutral-200 dark:border-neutral-800 p-4">
                        <div className="flex items-center gap-3 group-data-[collapsible=icon]:justify-center">
                            <Avatar className="h-9 w-9">
                                <AvatarFallback className="bg-violet-100 text-violet-700">
                                    {user.initials}
                                </AvatarFallback>
                            </Avatar>
                            <div className="flex-1 min-w-0 group-data-[collapsible=icon]:hidden">
                                <p className="text-sm font-medium truncate">{user.name}</p>
                                <p className="text-xs text-neutral-500 truncate">{user.role}</p>
                            </div>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className="h-8 w-8 p-0 group-data-[collapsible=icon]:hidden"
                                    >
                                        <Settings className="h-4 w-4" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="w-48">
                                    <DropdownMenuItem onClick={onProfileClick}>
                                        <User className="h-4 w-4 mr-2" />
                                        Profile
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem onClick={onLogout}>
                                        <LogOut className="h-4 w-4 mr-2" />
                                        Logout
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </SidebarFooter>
                </Sidebar>

                <SidebarInset className="flex-1">
                    <header className="sticky top-0 z-10 border-b border-neutral-200 bg-white px-6 py-4">
                        <div className="flex items-center gap-4">
                            <SidebarTrigger />
                            <div className="flex-1">
                                <h2 className="text-2xl font-semibold">{title}</h2>
                            </div>
                        </div>
                    </header>

                    <main className="p-6">{children}</main>
                </SidebarInset>
            </div>
        </SidebarProvider>
    );
}
