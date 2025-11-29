"use client";

import {
    DashboardLayout,
    MenuItem,
    DashboardOverview,
    ProjectsAndTasks,
    TeamManagement,
    VAManagement,
    MessagingCenter,
    ProfileSettings
} from "@realtyeaseai/ui";
import { LayoutDashboard, FolderKanban, Users, Bot, MessageSquare } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ManagerDashboard() {
    const [activeView, setActiveView] = useState("dashboard");
    const router = useRouter();

    const user = {
        name: "Manager User",
        email: "manager@realtyease.ai",
        phone: "+1 (555) 345-6789",
        role: "Manager",
        initials: "MG"
    };

    const menuItems: MenuItem[] = [
        { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, onClick: () => setActiveView('dashboard'), isActive: activeView === 'dashboard' },
        { id: 'projects', label: 'Team Projects', icon: FolderKanban, onClick: () => setActiveView('projects'), isActive: activeView === 'projects' },
        { id: 'team', label: 'My Team', icon: Users, onClick: () => setActiveView('team'), isActive: activeView === 'team' },
        { id: 'virtual-assistants', label: 'Assigned VAs', icon: Bot, onClick: () => setActiveView('virtual-assistants'), isActive: activeView === 'virtual-assistants' },
        { id: 'messages', label: 'Team Messages', icon: MessageSquare, onClick: () => setActiveView('messages'), isActive: activeView === 'messages' },
    ];

    const getTitleForView = () => {
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
            onProfileClick={handleProfile}
            onLogout={handleLogout}
        >
            {activeView === 'dashboard' && <DashboardOverview />}
            {activeView === 'projects' && <ProjectsAndTasks />}
            {activeView === 'team' && <TeamManagement />}
            {activeView === 'virtual-assistants' && <VAManagement />}
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
