"use client";

import { MenuItem } from "../../../components/dashboard/DashboardLayout";
import { LayoutDashboard, FolderKanban, Users, Bot, CreditCard, MessageSquare, Sparkles, Calendar, PenSquare, BarChart3 } from "lucide-react";

export const getClientMenuItems = (activeView: string, setActiveView: (view: string) => void): MenuItem[] => [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, onClick: () => setActiveView('dashboard'), isActive: activeView === 'dashboard' },
    { id: 'content-calendar', label: 'Content Calendar', icon: Calendar, onClick: () => setActiveView('content-calendar'), isActive: activeView === 'content-calendar' },
    { id: 'create-post', label: 'Create Post', icon: PenSquare, onClick: () => setActiveView('create-post'), isActive: activeView === 'create-post' },
    { id: 'social-analytics', label: 'Social Analytics', icon: BarChart3, onClick: () => setActiveView('social-analytics'), isActive: activeView === 'social-analytics' },
    { id: 'projects', label: 'Projects & Tasks', icon: FolderKanban, onClick: () => setActiveView('projects'), isActive: activeView === 'projects' },
    { id: 'team', label: 'Team', icon: Users, onClick: () => setActiveView('team'), isActive: activeView === 'team' },
    { id: 'virtual-assistants', label: 'Virtual Assistants', icon: Bot, onClick: () => setActiveView('virtual-assistants'), isActive: activeView === 'virtual-assistants' },
    { id: 'ai-tools', label: 'AI Tools', icon: Sparkles, onClick: () => setActiveView('ai-tools'), isActive: activeView === 'ai-tools' },
    { id: 'invoices', label: 'Billing', icon: CreditCard, onClick: () => setActiveView('invoices'), isActive: activeView === 'invoices' },
    { id: 'messages', label: 'Messages', icon: MessageSquare, onClick: () => setActiveView('messages'), isActive: activeView === 'messages' },
];

export const getClientTitle = (activeView: string): string => {
    switch (activeView) {
        case 'dashboard': return 'Dashboard';
        case 'content-calendar': return 'Content Calendar';
        case 'create-post': return 'Create Post';
        case 'social-analytics': return 'Social Media Analytics';
        case 'projects': return 'Projects & Tasks';
        case 'team': return 'Team';
        case 'virtual-assistants': return 'Virtual Assistants';
        case 'ai-tools': return 'AI Tools';
        case 'invoices': return 'Billing';
        case 'messages': return 'Messages';
        case 'profile': return 'Profile Settings';
        default: return 'Dashboard';
    }
};
