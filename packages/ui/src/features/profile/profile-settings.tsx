"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../../card";
import { Button } from "../../button";
import { Input } from "../../input";
import { Label } from "../../label";
import { Avatar, AvatarFallback } from "../../avatar";
import { Separator } from "../../separator";
import { User, Mail, Phone, Lock, Save } from "lucide-react";
import { toast } from "sonner";

interface ProfileData {
    name: string;
    email: string;
    phone: string;
    role: string;
    initials: string;
}

interface ProfileSettingsProps {
    user?: ProfileData;
    onSave?: (data: ProfileData) => Promise<void>;
    onPasswordChange?: (currentPassword: string, newPassword: string) => Promise<void>;
}

export function ProfileSettings({
    user = {
        name: "John Doe",
        email: "john@example.com",
        phone: "+1 234 567 8900",
        role: "User",
        initials: "JD"
    },
    onSave,
    onPasswordChange
}: ProfileSettingsProps) {
    const [isEditing, setIsEditing] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [isChangingPassword, setIsChangingPassword] = useState(false);

    const [formData, setFormData] = useState<ProfileData>(user);

    const [passwordData, setPasswordData] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: ""
    });

    const handleSave = async () => {
        setIsSaving(true);
        try {
            if (onSave) {
                await onSave(formData);
            }
            toast.success("Profile updated successfully!");
            setIsEditing(false);
        } catch (error) {
            toast.error("Failed to update profile");
        } finally {
            setIsSaving(false);
        }
    };

    const handleCancel = () => {
        setFormData(user);
        setIsEditing(false);
    };

    const handlePasswordChange = async () => {
        if (passwordData.newPassword !== passwordData.confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }

        if (passwordData.newPassword.length < 8) {
            toast.error("Password must be at least 8 characters");
            return;
        }

        setIsChangingPassword(true);
        try {
            if (onPasswordChange) {
                await onPasswordChange(passwordData.currentPassword, passwordData.newPassword);
            }
            toast.success("Password changed successfully!");
            setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" });
        } catch (error) {
            toast.error("Failed to change password");
        } finally {
            setIsChangingPassword(false);
        }
    };

    return (
        <div className="space-y-6 max-w-4xl">
            {/* Profile Information Card */}
            <Card>
                <CardHeader>
                    <CardTitle>Personal Information</CardTitle>
                    <CardDescription>Update your personal details and contact information</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    {/* Avatar Section */}
                    <div className="flex items-center gap-6">
                        <Avatar className="h-24 w-24">
                            <AvatarFallback className="bg-violet-100 text-violet-700 text-2xl">
                                {formData.initials}
                            </AvatarFallback>
                        </Avatar>
                        <div>
                            <h3 className="font-semibold text-lg">{formData.name}</h3>
                            <p className="text-sm text-gray-600">{formData.role}</p>
                            <Button variant="outline" size="sm" className="mt-2">
                                Change Avatar
                            </Button>
                        </div>
                    </div>

                    <Separator />

                    {/* Form Fields */}
                    <div className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                            <Label htmlFor="name">Full Name</Label>
                            <div className="relative">
                                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                                <Input
                                    id="name"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    disabled={!isEditing}
                                    className="pl-10"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="email">Email Address</Label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                                <Input
                                    id="email"
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    disabled={!isEditing}
                                    className="pl-10"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="phone">Phone Number</Label>
                            <div className="relative">
                                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                                <Input
                                    id="phone"
                                    type="tel"
                                    value={formData.phone}
                                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                    disabled={!isEditing}
                                    className="pl-10"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="role">Role</Label>
                            <Input
                                id="role"
                                value={formData.role}
                                disabled
                                className="bg-gray-50"
                            />
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3">
                        {!isEditing ? (
                            <Button onClick={() => setIsEditing(true)}>
                                Edit Profile
                            </Button>
                        ) : (
                            <>
                                <Button onClick={handleSave} disabled={isSaving}>
                                    <Save className="h-4 w-4 mr-2" />
                                    {isSaving ? "Saving..." : "Save Changes"}
                                </Button>
                                <Button variant="outline" onClick={handleCancel} disabled={isSaving}>
                                    Cancel
                                </Button>
                            </>
                        )}
                    </div>
                </CardContent>
            </Card>

            {/* Password Change Card */}
            <Card>
                <CardHeader>
                    <CardTitle>Change Password</CardTitle>
                    <CardDescription>Update your password to keep your account secure</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="currentPassword">Current Password</Label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                            <Input
                                id="currentPassword"
                                type="password"
                                value={passwordData.currentPassword}
                                onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                                className="pl-10"
                                placeholder="Enter current password"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="newPassword">New Password</Label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                            <Input
                                id="newPassword"
                                type="password"
                                value={passwordData.newPassword}
                                onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                                className="pl-10"
                                placeholder="Enter new password (min. 8 characters)"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="confirmPassword">Confirm New Password</Label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                            <Input
                                id="confirmPassword"
                                type="password"
                                value={passwordData.confirmPassword}
                                onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                                className="pl-10"
                                placeholder="Confirm new password"
                            />
                        </div>
                    </div>

                    <Button
                        onClick={handlePasswordChange}
                        disabled={isChangingPassword || !passwordData.currentPassword || !passwordData.newPassword || !passwordData.confirmPassword}
                    >
                        {isChangingPassword ? "Changing Password..." : "Change Password"}
                    </Button>
                </CardContent>
            </Card>

            {/* Account Information Card */}
            <Card>
                <CardHeader>
                    <CardTitle>Account Information</CardTitle>
                    <CardDescription>Additional details about your account</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2">
                        <div>
                            <p className="text-sm text-gray-600">Account Created</p>
                            <p className="font-medium">January 15, 2024</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-600">Last Login</p>
                            <p className="font-medium">Today at 10:30 AM</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-600">Account Status</p>
                            <p className="font-medium text-green-600">Active</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-600">Email Verified</p>
                            <p className="font-medium text-green-600">Yes</p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
