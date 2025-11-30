import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@repo/ui';
import { Button } from '@repo/ui';
import { Badge } from '@repo/ui';
import { Avatar, AvatarFallback } from '@repo/ui';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@repo/ui';
import { Input } from '@repo/ui';
import { Label } from '@repo/ui';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@repo/ui';
import { Plus, Search, Mail, Phone, MoreVertical, Users, UserCheck, Crown } from 'lucide-react';

const teamMembers = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john@company.com',
    phone: '+1 234 567 8900',
    role: 'Owner',
    avatar: 'JD',
    status: 'Active',
    joinedDate: '2024-01-15',
    projects: 8,
    isOwner: true,
  },
  {
    id: 2,
    name: 'Sarah Williams',
    email: 'sarah@company.com',
    phone: '+1 234 567 8901',
    role: 'Manager',
    avatar: 'SW',
    status: 'Active',
    joinedDate: '2024-03-10',
    projects: 5,
    isOwner: false,
  },
  {
    id: 3,
    name: 'Michael Chen',
    email: 'michael@company.com',
    phone: '+1 234 567 8902',
    role: 'Team Lead',
    avatar: 'MC',
    status: 'Active',
    joinedDate: '2024-05-22',
    projects: 4,
    isOwner: false,
  },
  {
    id: 4,
    name: 'Emma Rodriguez',
    email: 'emma@company.com',
    phone: '+1 234 567 8903',
    role: 'Member',
    avatar: 'ER',
    status: 'Active',
    joinedDate: '2024-08-15',
    projects: 3,
    isOwner: false,
  },
  {
    id: 5,
    name: 'David Kim',
    email: 'david@company.com',
    phone: '+1 234 567 8904',
    role: 'Member',
    avatar: 'DK',
    status: 'Inactive',
    joinedDate: '2024-09-01',
    projects: 2,
    isOwner: false,
  },
];

export function TeamManagement() {
  const [inviteDialogOpen, setInviteDialogOpen] = useState(false);

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'Owner': return 'bg-purple-100 text-purple-700 border-purple-200';
      case 'Manager': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'Team Lead': return 'bg-green-100 text-green-700 border-green-200';
      case 'Member': return 'bg-neutral-100 text-neutral-700 border-neutral-200';
      default: return 'bg-neutral-100 text-neutral-700 border-neutral-200';
    }
  };

  const getRoleIcon = (role: string, isOwner: boolean) => {
    if (isOwner) return <Crown className="h-3 w-3" />;
    if (role === 'Manager') return <UserCheck className="h-3 w-3" />;
    return <Users className="h-3 w-3" />;
  };

  return (
    <div className="space-y-6">
      {/* Header Actions */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
          <Input placeholder="Search team members..." className="pl-9" />
        </div>
        <Dialog open={inviteDialogOpen} onOpenChange={setInviteDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Invite Member
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Invite Team Member</DialogTitle>
              <DialogDescription>Send an invitation to join your team</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label>Email Address</Label>
                <Input type="email" placeholder="member@email.com" />
              </div>
              <div className="space-y-2">
                <Label>Role</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="manager">Manager</SelectItem>
                    <SelectItem value="lead">Team Lead</SelectItem>
                    <SelectItem value="member">Member</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Full Name (Optional)</Label>
                <Input placeholder="Member's full name" />
              </div>
              <div className="flex justify-end gap-2 pt-4">
                <Button variant="outline" onClick={() => setInviteDialogOpen(false)}>Cancel</Button>
                <Button onClick={() => setInviteDialogOpen(false)}>Send Invitation</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-neutral-600">Total Members</p>
                <p className="text-2xl font-bold mt-1">{teamMembers.length}</p>
              </div>
              <Users className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-neutral-600">Active Members</p>
                <p className="text-2xl font-bold mt-1">{teamMembers.filter(m => m.status === 'Active').length}</p>
              </div>
              <UserCheck className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-neutral-600">Managers</p>
                <p className="text-2xl font-bold mt-1">{teamMembers.filter(m => m.role === 'Manager').length}</p>
              </div>
              <Crown className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-neutral-600">Avg Projects</p>
                <p className="text-2xl font-bold mt-1">
                  {Math.round(teamMembers.reduce((sum, m) => sum + m.projects, 0) / teamMembers.length)}
                </p>
              </div>
              <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                <span className="text-sm font-bold text-blue-600">↑</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Team Members Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {teamMembers.map((member) => (
          <Card key={member.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <Avatar className="h-12 w-12">
                    <AvatarFallback className={member.isOwner ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'}>
                      {member.avatar}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium">{member.name}</h3>
                      {member.isOwner && <Crown className="h-3 w-3 text-purple-600" />}
                    </div>
                    <Badge variant="outline" className={`${getRoleBadgeColor(member.role)} text-xs mt-1`}>
                      <span className="flex items-center gap-1">
                        {getRoleIcon(member.role, member.isOwner)}
                        {member.role}
                      </span>
                    </Badge>
                  </div>
                </div>
                <Button variant="ghost" size="sm">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2 text-neutral-600">
                  <Mail className="h-4 w-4" />
                  <span className="truncate">{member.email}</span>
                </div>
                <div className="flex items-center gap-2 text-neutral-600">
                  <Phone className="h-4 w-4" />
                  <span>{member.phone}</span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-neutral-100">
                <div>
                  <p className="text-xs text-neutral-500">Projects</p>
                  <p className="font-medium">{member.projects}</p>
                </div>
                <div>
                  <p className="text-xs text-neutral-500">Joined</p>
                  <p className="font-medium text-sm">{member.joinedDate}</p>
                </div>
                <Badge variant="outline" className={member.status === 'Active' ? 'bg-green-100 text-green-700 border-green-200' : 'bg-neutral-100 text-neutral-600 border-neutral-200'}>
                  {member.status}
                </Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Team Roles Info */}
      <Card>
        <CardHeader>
          <CardTitle>Team Roles & Permissions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { role: 'Owner', icon: Crown, color: 'purple', permissions: 'Full access to all features, billing, and team management' },
              { role: 'Manager', icon: UserCheck, color: 'blue', permissions: 'Can manage projects, assign tasks, and invite team members' },
              { role: 'Team Lead', icon: Users, color: 'green', permissions: 'Can create projects, manage tasks, and view team activity' },
              { role: 'Member', icon: Users, color: 'neutral', permissions: 'Can view assigned projects and complete tasks' },
            ].map((item) => (
              <div key={item.role} className="flex items-start gap-3 p-4 bg-neutral-50 rounded-lg">
                <div className={`h-10 w-10 rounded-lg bg-${item.color}-100 flex items-center justify-center shrink-0`}>
                  <item.icon className={`h-5 w-5 text-${item.color}-600`} />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium">{item.role}</h4>
                  <p className="text-sm text-neutral-600 mt-1">{item.permissions}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
