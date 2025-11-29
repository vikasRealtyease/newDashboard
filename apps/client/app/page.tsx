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
    ProfileSettings,
    ContentCalendar,
    PostCreator,
    SocialMediaAnalytics
} from "@realtyeaseai/ui";
import { LayoutDashboard, FolderKanban, Users, Bot, CreditCard, MessageSquare, Sparkles, Calendar, PenSquare, BarChart3 } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ClientDashboard() {
    const [activeView, setActiveView] = useState("dashboard");
    const router = useRouter();

    const user = {
        name: "Client User",
        email: "client@realtyease.ai",
        phone: "+1 (555) 123-4567",
        role: "Client",
        initials: "CU"
    };

    const menuItems: MenuItem[] = [
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

    const getTitleForView = () => {
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

    const handleProfile = () => {
        setActiveView('profile');
    };

    const handleLogout = () => {
        localStorage.removeItem('user');
        router.push('/login');
    };

    const handleProfileSave = async (data: any) => {
        // API call to save profile
        console.log('Saving profile:', data);
        await new Promise(resolve => setTimeout(resolve, 1000));
    };

    const handlePasswordChange = async (currentPassword: string, newPassword: string) => {
        // API call to change password
        console.log('Changing password');
        await new Promise(resolve => setTimeout(resolve, 1000));
    };

    return (
        <DashboardLayout
            menuItems={menuItems}
            title={getTitleForView()}
            user={user}
            onProfileClick={handleProfile}
            onLogout={handleLogout}
        >
            {activeView === 'dashboard' && <DashboardOverview />}
            {activeView === 'content-calendar' && <ContentCalendar />}
            {activeView === 'create-post' && <PostCreator />}
            {activeView === 'social-analytics' && <SocialMediaAnalytics />}
            {activeView === 'projects' && <ProjectsAndTasks />}
            {activeView === 'team' && <TeamManagement />}
            {activeView === 'virtual-assistants' && <VAManagement />}
            {activeView === 'ai-tools' && <AIToolsHub />}
            {activeView === 'invoices' && <InvoicePayments />}
            {activeView === 'messages' && <MessagingCenter />}
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
