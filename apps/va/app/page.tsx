"use client";

import {
    DashboardLayout,
    MenuItem,
    DashboardOverview,
    TaskManagement,
    MessagingCenter,
    ProfileSettings
} from "@realtyeaseai/ui";
import { LayoutDashboard, FolderKanban, MessageSquare, Clock } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function VADashboard() {
    const [activeView, setActiveView] = useState("dashboard");
    const router = useRouter();

    const user = {
        name: "VA User",
        email: "va@realtyease.ai",
        phone: "+1 (555) 456-7890",
        role: "Virtual Assistant",
        initials: "VA"
    };

    const menuItems: MenuItem[] = [
        { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, onClick: () => setActiveView('dashboard'), isActive: activeView === 'dashboard' },
        { id: 'tasks', label: 'My Tasks', icon: FolderKanban, onClick: () => setActiveView('tasks'), isActive: activeView === 'tasks' },
        { id: 'messages', label: 'Messages', icon: MessageSquare, onClick: () => setActiveView('messages'), isActive: activeView === 'messages' },
    ];

    const getTitleForView = () => {
        switch (activeView) {
            case 'dashboard': return 'Dashboard';
            case 'tasks': return 'My Tasks';
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
            {activeView === 'tasks' && <TaskManagement />}
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
