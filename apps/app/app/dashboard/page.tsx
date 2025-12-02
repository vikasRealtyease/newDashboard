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
} from "@realtyeaseai/ui";
import {
    getAdminMenuItems,
    getAdminTitle,
    getClientMenuItems,
    getClientTitle,
    getManagerMenuItems,
    getManagerTitle,
    getVAMenuItems,
    getVATitle,
} from "@realtyeaseai/ui/role-dashboards";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Role } from "@realtyeaseai/database";
import { useSession, signOut } from "next-auth/react";
import { getPrimaryRole } from "@realtyeaseai/auth";

const WEB_URL = process.env.NEXT_PUBLIC_WEB_URL || (typeof window !== 'undefined' && window.location.hostname === 'localhost' ? 'http://localhost:4000' : 'https://realtyeaseai.com');

export default function DashboardPage() {
    const [activeView, setActiveView] = useState("dashboard");
    const router = useRouter();
    const { data: session, status } = useSession();

    // Redirect to login if not authenticated
    useEffect(() => {
        if (status === 'unauthenticated') {
            router.push(`${WEB_URL}/login`);
        }
    }, [status, router]);

    // Show loading state while checking authentication
    if (status === 'loading') {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading...</p>
                </div>
            </div>
        );
    }

    // If no session, don't render (will redirect)
    if (!session?.user) {
        return null;
    }

    const user = session.user;
    const primaryRole = getPrimaryRole(user.roles || []) || 'CLIENT' as Role;

    // Format user data for DashboardLayout
    const formattedUser = {
        name: user.name || 'User',
        email: user.email || '',
        phone: '', // Add phone to user profile if needed
        role: primaryRole.charAt(0) + primaryRole.slice(1).toLowerCase(), // Display format
        primaryRole: primaryRole,
        initials: user.name?.split(' ').map(n => n[0]).join('').toUpperCase() || 'U'
    };

    const handleProfile = () => {
        setActiveView('profile');
    };

    const handleLogout = async () => {
        await signOut({
            callbackUrl: `${WEB_URL}/login`,
            redirect: true
        });
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
        switch (formattedUser.primaryRole) {
            case 'ADMIN':
            case 'SUPERADMIN':
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
        switch (formattedUser.primaryRole) {
            case 'ADMIN':
            case 'SUPERADMIN':
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

    const isAdmin = formattedUser.primaryRole === 'ADMIN' || formattedUser.primaryRole === 'SUPERADMIN';

    return (
        <DashboardLayout
            menuItems={getMenuItems()}
            title={getTitle()}
            user={formattedUser}
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
                    user={formattedUser}
                    onSave={handleProfileSave}
                    onPasswordChange={handlePasswordChange}
                />
            )}
        </DashboardLayout>
    );
}
