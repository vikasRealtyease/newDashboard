"use client";

import { MenuItem } from "../../../layouts/dashboard-layout";
import { LayoutDashboard, FolderKanban, Users, Bot, MessageSquare } from "lucide-react";

export const getManagerMenuItems = (activeView: string, setActiveView: (view: string) => void): MenuItem[] => [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, onClick: () => setActiveView('dashboard'), isActive: activeView === 'dashboard' },
    { id: 'projects', label: 'Team Projects', icon: FolderKanban, onClick: () => setActiveView('projects'), isActive: activeView === 'projects' },
    { id: 'team', label: 'My Team', icon: Users, onClick: () => setActiveView('team'), isActive: activeView === 'team' },
    { id: 'virtual-assistants', label: 'Assigned VAs', icon: Bot, onClick: () => setActiveView('virtual-assistants'), isActive: activeView === 'virtual-assistants' },
    { id: 'messages', label: 'Team Messages', icon: MessageSquare, onClick: () => setActiveView('messages'), isActive: activeView === 'messages' },
];

export const getManagerTitle = (activeView: string): string => {
    switch (activeView) {
        case 'dashboard': return 'Dashboard';
        case 'projects': return 'Team Projects';
        case 'team': return 'My Team';
        case 'virtual-assistants': return 'Assigned VAs';
        case 'messages': return 'Team Messages';
        case 'profile': return 'Profile Settings';
        default: return 'Dashboard';
    }
};
