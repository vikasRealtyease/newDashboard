"use client";

import { MenuItem } from "../../../layouts/dashboard-layout";
import { LayoutDashboard, FolderKanban, Users, Bot, CreditCard, MessageSquare, Sparkles, Share2 } from "lucide-react";

export const getAdminMenuItems = (activeView: string, setActiveView: (view: string) => void): MenuItem[] => [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, onClick: () => setActiveView('dashboard'), isActive: activeView === 'dashboard' },
    { id: 'projects', label: 'All Projects', icon: FolderKanban, onClick: () => setActiveView('projects'), isActive: activeView === 'projects' },
    { id: 'team', label: 'Team Management', icon: Users, onClick: () => setActiveView('team'), isActive: activeView === 'team' },
    { id: 'virtual-assistants', label: 'VA Management', icon: Bot, onClick: () => setActiveView('virtual-assistants'), isActive: activeView === 'virtual-assistants' },
    { id: 'ai-tools', label: 'AI Tools', icon: Sparkles, onClick: () => setActiveView('ai-tools'), isActive: activeView === 'ai-tools' },
    {
        id: 'social-media',
        label: 'Social Media Tools',
        icon: Share2,
        subItems: [
            { id: 'content-calendar', label: 'Content Calendar', onClick: () => setActiveView('content-calendar'), isActive: activeView === 'content-calendar' },
            { id: 'create-post', label: 'Create Post', onClick: () => setActiveView('create-post'), isActive: activeView === 'create-post' },
            { id: 'social-analytics', label: 'Social Analytics', onClick: () => setActiveView('social-analytics'), isActive: activeView === 'social-analytics' },
        ]
    },
    { id: 'invoices', label: 'Billing & Invoices', icon: CreditCard, onClick: () => setActiveView('invoices'), isActive: activeView === 'invoices' },
    { id: 'messages', label: 'Messages', icon: MessageSquare, onClick: () => setActiveView('messages'), isActive: activeView === 'messages' },
];

export const getAdminTitle = (activeView: string): string => {
    switch (activeView) {
        case 'dashboard': return 'Dashboard';
        case 'projects': return 'All Projects';
        case 'team': return 'Team Management';
        case 'virtual-assistants': return 'VA Management';
        case 'ai-tools': return 'AI Tools';
        case 'content-calendar': return 'Content Calendar';
        case 'create-post': return 'Create Post';
        case 'social-analytics': return 'Social Analytics';
        case 'invoices': return 'Billing & Invoices';
        case 'messages': return 'Messages';
        case 'admin': return 'Super Admin Panel';
        case 'profile': return 'Profile Settings';
        default: return 'Dashboard';
    }
};
