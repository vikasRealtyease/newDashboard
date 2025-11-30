"use client";

import { MenuItem } from "../../../components/dashboard/DashboardLayout";
import { LayoutDashboard, CheckSquare, Users, MessageSquare } from "lucide-react";

export const getVAMenuItems = (activeView: string, setActiveView: (view: string) => void): MenuItem[] => [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, onClick: () => setActiveView('dashboard'), isActive: activeView === 'dashboard' },
    { id: 'tasks', label: 'My Tasks', icon: CheckSquare, onClick: () => setActiveView('tasks'), isActive: activeView === 'tasks' },
    { id: 'clients', label: 'Assigned Clients', icon: Users, onClick: () => setActiveView('clients'), isActive: activeView === 'clients' },
    { id: 'messages', label: 'Messages', icon: MessageSquare, onClick: () => setActiveView('messages'), isActive: activeView === 'messages' },
];

export const getVATitle = (activeView: string): string => {
    switch (activeView) {
        case 'dashboard': return 'Dashboard';
        case 'tasks': return 'My Tasks';
        case 'clients': return 'Assigned Clients';
        case 'messages': return 'Messages';
        case 'profile': return 'Profile Settings';
        default: return 'Dashboard';
    }
};
