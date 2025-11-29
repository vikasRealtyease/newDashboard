"use client";

import {
    DashboardLayout,
    MenuItem,
    DashboardOverview,
    ProjectsAndTasks,
    TeamManagement,
    VAManagement,
    InvoicePayments,
    MessagingCenter,
    AIToolsHub,
    SuperAdminPanel,
    ProfileSettings,
    ContentCalendar,
    PostCreator,
    SocialMediaAnalytics
} from "@realtyeaseai/ui";
import { LayoutDashboard, FolderKanban, Users, Bot, CreditCard, MessageSquare, Sparkles, Share2 } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminDashboard() {
    const [activeView, setActiveView] = useState("dashboard");
    const router = useRouter();

    const user = {
        name: "Admin User",
        email: "admin@realtyease.ai",
        phone: "+1 (555) 234-5678",
        role: "Administrator",
        initials: "AD"
    };

    const menuItems: MenuItem[] = [
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

    const getTitleForView = () => {
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

    const handleProfile = () => {
        setActiveView('profile');
    };

    const handleLogout = () => {
        localStorage.removeItem('user');
        router.push('/login');
    };

    const handleProfileSave = async (data: any) => {
        console.log('Saving profile:', data);
        await new Promise(resolve => setTimeout(resolve, 1000));
    };

    const handlePasswordChange = async (currentPassword: string, newPassword: string) => {
        console.log('Changing password');
        await new Promise(resolve => setTimeout(resolve, 1000));
    };

    return (
        <DashboardLayout
            menuItems={menuItems}
            title={getTitleForView()}
            user={user}
            isSuperAdmin={true}
            onAdminClick={() => setActiveView('admin')}
            isAdminActive={activeView === 'admin'}
            onProfileClick={handleProfile}
            onLogout={handleLogout}
        >
            {activeView === 'dashboard' && <DashboardOverview />}
            {activeView === 'projects' && <ProjectsAndTasks />}
            {activeView === 'team' && <TeamManagement />}
            {activeView === 'virtual-assistants' && <VAManagement />}
            {activeView === 'ai-tools' && <AIToolsHub />}
            {activeView === 'content-calendar' && <ContentCalendar />}
            {activeView === 'create-post' && <PostCreator />}
            {activeView === 'social-analytics' && <SocialMediaAnalytics />}
            {activeView === 'invoices' && <InvoicePayments />}
            {activeView === 'messages' && <MessagingCenter />}
            {activeView === 'admin' && <SuperAdminPanel />}
            {activeView === 'profile' && (
                <ProfileSettings
                    user={user}
                    onSave={handleProfileSave}
                    onPasswordChange={handlePasswordChange}
                />
            )}
        </DashboardLayout>
    );
}
