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
    SocialMediaAnalytics,
    SuperAdminPanel,
    getAdminMenuItems,
    getAdminTitle,
    getClientMenuItems,
    getClientTitle,
    getManagerMenuItems,
    getManagerTitle,
    getVAMenuItems,
    getVATitle,
} from "@realtyeaseai/ui";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Role } from "@realtyeaseai/database";

// This would come from session in production
const getMockUser = () => ({
    name: "Test User",
    email: "user@realtyease.ai",
    phone: "+1 (555) 123-4567",
    role: "Client", // Display role
    primaryRole: "CLIENT" as Role, // Actual role from database
    initials: "TU"
});

export default function UnifiedDashboard() {
    const [activeView, setActiveView] = useState("dashboard");
    const [user, setUser] = useState(getMockUser());
    const router = useRouter();

    // In production, get user from session
    // const session = useSession();
    // const user = session?.user;

    const handleProfile = () => {
        setActiveView('profile');
    };

    const handleLogout = () => {
        // Use NextAuth signOut in production
        // signOut({ callbackUrl: '/login' });
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

    // Get menu items and title based on role
    const getMenuItems = (): MenuItem[] => {
        switch (user.primaryRole) {
            case 'ADMIN':
                return getAdminMenuItems(activeView, setActiveView);
            case 'MANAGER':
                return getManagerMenuItems(activeView, setActiveView);
            case 'VA':
                return getVAMenuItems(activeView, setActiveView);
            case 'CLIENT':
            default:
                return getClientMenuItems(activeView, setActiveView);
        }
    };

    const getTitle = (): string => {
        switch (user.primaryRole) {
            case 'ADMIN':
                return getAdminTitle(activeView);
            case 'MANAGER':
                return getManagerTitle(activeView);
            case 'VA':
                return getVATitle(activeView);
            case 'CLIENT':
            default:
                return getClientTitle(activeView);
        }
    };

    const isAdmin = user.primaryRole === 'ADMIN';

    return (
        <DashboardLayout
            menuItems={getMenuItems()}
            title={getTitle()}
            user={user}
            isSuperAdmin={isAdmin}
            onAdminClick={isAdmin ? () => setActiveView('admin') : undefined}
            isAdminActive={activeView === 'admin'}
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
            {activeView === 'tasks' && <ProjectsAndTasks />}
            {activeView === 'clients' && <TeamManagement />}
            {isAdmin && activeView === 'admin' && <SuperAdminPanel />}
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
