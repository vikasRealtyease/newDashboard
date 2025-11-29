import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@repo/ui';
import { Button } from '@repo/ui';
import { Input } from '@repo/ui';
import { Badge } from '@repo/ui';
import { Avatar, AvatarFallback } from '@repo/ui';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@repo/ui';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@repo/ui';
import { Search, Filter, Download, TrendingUp, TrendingDown, Users, DollarSign, Briefcase, Bot, Zap, Eye, MoreVertical, AlertTriangle } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, PieChart, Pie, Cell } from 'recharts';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@repo/ui';

// Mock data for 1000 clients (showing subset for performance)
const generateClients = () => {
  const statuses = ['Active', 'Inactive', 'Trial', 'Suspended'];
  const plans = ['Starter', 'Professional', 'Enterprise'];
  const clients = [];

  for (let i = 1; i <= 50; i++) {
    clients.push({
      id: `CLT-${String(i).padStart(5, '0')}`,
      name: `Client ${i}`,
      company: `Company ${i} Inc.`,
      email: `client${i}@company.com`,
      status: statuses[Math.floor(Math.random() * statuses.length)],
      plan: plans[Math.floor(Math.random() * plans.length)],
      revenue: Math.floor(Math.random() * 50000) + 5000,
      projects: Math.floor(Math.random() * 20) + 1,
      vas: Math.floor(Math.random() * 5) + 1,
      joinedDate: `2024-${String(Math.floor(Math.random() * 12) + 1).padStart(2, '0')}-${String(Math.floor(Math.random() * 28) + 1).padStart(2, '0')}`,
      lastActive: `${Math.floor(Math.random() * 24)}h ago`,
      usage: Math.floor(Math.random() * 100),
    });
  }

  return clients;
};

const clients = generateClients();

const revenueData = [
  { month: 'Jan', revenue: 450000, clients: 850 },
  { month: 'Feb', revenue: 520000, clients: 892 },
  { month: 'Mar', revenue: 480000, clients: 915 },
  { month: 'Apr', revenue: 610000, clients: 948 },
  { month: 'May', revenue: 550000, clients: 967 },
  { month: 'Jun', revenue: 670000, clients: 982 },
];

const clientsByPlan = [
  { name: 'Starter', value: 450, color: '#3b82f6' },
  { name: 'Professional', value: 380, color: '#8b5cf6' },
  { name: 'Enterprise', value: 170, color: '#10b981' },
];

const topClients = [
  { id: 1, name: 'TechCorp Global', revenue: 145000, projects: 28, vas: 12, growth: 24 },
  { id: 2, name: 'Innovation Labs', revenue: 132000, projects: 24, vas: 10, growth: 18 },
  { id: 3, name: 'Digital Ventures', revenue: 118000, projects: 22, vas: 9, growth: 32 },
  { id: 4, name: 'CloudSync Inc', revenue: 98000, projects: 18, vas: 8, growth: 15 },
  { id: 5, name: 'DataFlow Systems', revenue: 87000, projects: 16, vas: 7, growth: 21 },
];

const systemMetrics = {
  totalClients: 1000,
  activeClients: 847,
  totalRevenue: 2847000,
  totalProjects: 3420,
  totalVAs: 1250,
  totalAIApiCalls: 14800000,
  avgProjectsPerClient: 3.4,
  avgVAsPerClient: 1.25,
};

export function SuperAdminPanel() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedPlan, setSelectedPlan] = useState('all');

  const filteredClients = clients.filter(client => {
    const matchesSearch = client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      client.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      client.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      client.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || client.status === selectedStatus;
    const matchesPlan = selectedPlan === 'all' || client.plan === selectedPlan;

    return matchesSearch && matchesStatus && matchesPlan;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-700 border-green-200';
      case 'Trial': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'Inactive': return 'bg-neutral-100 text-neutral-600 border-neutral-200';
      case 'Suspended': return 'bg-red-100 text-red-700 border-red-200';
      default: return 'bg-neutral-100 text-neutral-700 border-neutral-200';
    }
  };

  const getPlanColor = (plan: string) => {
    switch (plan) {
      case 'Enterprise': return 'bg-purple-100 text-purple-700 border-purple-200';
      case 'Professional': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'Starter': return 'bg-neutral-100 text-neutral-700 border-neutral-200';
      default: return 'bg-neutral-100 text-neutral-700 border-neutral-200';
    }
  };

  return (
    <div className="space-y-6">
      {/* Overview Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-neutral-600">Total Clients</p>
                <p className="text-3xl font-bold mt-1">{systemMetrics.totalClients.toLocaleString()}</p>
                <div className="flex items-center gap-1 text-xs text-green-600 mt-1">
                  <TrendingUp className="h-3 w-3" />
                  <span>{systemMetrics.activeClients} Active</span>
                </div>
              </div>
              <Users className="h-10 w-10 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-neutral-600">Total Revenue</p>
                <p className="text-3xl font-bold mt-1">${(systemMetrics.totalRevenue / 1000000).toFixed(2)}M</p>
                <div className="flex items-center gap-1 text-xs text-green-600 mt-1">
                  <TrendingUp className="h-3 w-3" />
                  <span>+18.5% this month</span>
                </div>
              </div>
              <DollarSign className="h-10 w-10 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-neutral-600">Active Projects</p>
                <p className="text-3xl font-bold mt-1">{systemMetrics.totalProjects.toLocaleString()}</p>
                <div className="flex items-center gap-1 text-xs text-blue-600 mt-1">
                  <Briefcase className="h-3 w-3" />
                  <span>Avg {systemMetrics.avgProjectsPerClient}/client</span>
                </div>
              </div>
              <Briefcase className="h-10 w-10 text-purple-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-neutral-600">Total VAs</p>
                <p className="text-3xl font-bold mt-1">{systemMetrics.totalVAs.toLocaleString()}</p>
                <div className="flex items-center gap-1 text-xs text-violet-600 mt-1">
                  <Bot className="h-3 w-3" />
                  <span>Avg {systemMetrics.avgVAsPerClient}/client</span>
                </div>
              </div>
              <Bot className="h-10 w-10 text-violet-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Revenue & Client Growth */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Revenue & Client Growth</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e5e5" />
                <XAxis dataKey="month" stroke="#737373" />
                <YAxis yAxisId="left" stroke="#737373" />
                <YAxis yAxisId="right" orientation="right" stroke="#737373" />
                <Tooltip
                  contentStyle={{ backgroundColor: 'white', border: '1px solid #e5e5e5', borderRadius: '8px' }}
                />
                <Legend />
                <Line yAxisId="left" type="monotone" dataKey="revenue" stroke="#10b981" strokeWidth={2} name="Revenue ($)" />
                <Line yAxisId="right" type="monotone" dataKey="clients" stroke="#8b5cf6" strokeWidth={2} name="Clients" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Clients by Plan</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={clientsByPlan}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }: any) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {clientsByPlan.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Tabs for different views */}
      <Tabs defaultValue="clients">
        <TabsList>
          <TabsTrigger value="clients">All Clients ({systemMetrics.totalClients})</TabsTrigger>
          <TabsTrigger value="top-clients">Top Clients</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="alerts">Alerts</TabsTrigger>
        </TabsList>

        <TabsContent value="clients" className="mt-6 space-y-4">
          {/* Filters */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
                  <Input
                    placeholder="Search by name, email, or ID..."
                    className="pl-9"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                  <SelectTrigger className="w-full md:w-[180px]">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="Active">Active</SelectItem>
                    <SelectItem value="Trial">Trial</SelectItem>
                    <SelectItem value="Inactive">Inactive</SelectItem>
                    <SelectItem value="Suspended">Suspended</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={selectedPlan} onValueChange={setSelectedPlan}>
                  <SelectTrigger className="w-full md:w-[180px]">
                    <SelectValue placeholder="Plan" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Plans</SelectItem>
                    <SelectItem value="Starter">Starter</SelectItem>
                    <SelectItem value="Professional">Professional</SelectItem>
                    <SelectItem value="Enterprise">Enterprise</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Clients Table */}
          <Card>
            <CardHeader>
              <CardTitle>Client Management ({filteredClients.length} results)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Client ID</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Plan</TableHead>
                      <TableHead>Revenue</TableHead>
                      <TableHead>Projects</TableHead>
                      <TableHead>VAs</TableHead>
                      <TableHead>Usage</TableHead>
                      <TableHead>Last Active</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredClients.map((client) => (
                      <TableRow key={client.id}>
                        <TableCell className="font-mono text-sm">{client.id}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Avatar className="h-8 w-8">
                              <AvatarFallback className="text-xs">
                                {client.name.split(' ').map(n => n[0]).join('')}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium">{client.name}</p>
                              <p className="text-xs text-neutral-500">{client.company}</p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className={getStatusColor(client.status)}>
                            {client.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className={getPlanColor(client.plan)}>
                            {client.plan}
                          </Badge>
                        </TableCell>
                        <TableCell className="font-medium">${client.revenue.toLocaleString()}</TableCell>
                        <TableCell>{client.projects}</TableCell>
                        <TableCell>{client.vas}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <div className="w-16 h-1.5 bg-neutral-200 rounded-full overflow-hidden">
                              <div
                                className={`h-full ${client.usage > 80 ? 'bg-red-500' : client.usage > 50 ? 'bg-amber-500' : 'bg-green-500'}`}
                                style={{ width: `${client.usage}%` }}
                              />
                            </div>
                            <span className="text-xs text-neutral-500">{client.usage}%</span>
                          </div>
                        </TableCell>
                        <TableCell className="text-sm text-neutral-500">{client.lastActive}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end gap-1">
                            <Button variant="ghost" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="top-clients" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Top Performing Clients</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topClients.map((client, index) => (
                  <div key={client.id} className="flex items-center gap-4 p-4 bg-neutral-50 rounded-lg border border-neutral-200">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-purple-600 text-white font-bold">
                      #{index + 1}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium">{client.name}</h4>
                      <div className="flex items-center gap-4 mt-1 text-sm text-neutral-600">
                        <span>{client.projects} Projects</span>
                        <span>{client.vas} VAs</span>
                        <span className="text-green-600 flex items-center gap-1">
                          <TrendingUp className="h-3 w-3" />
                          +{client.growth}%
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-green-600">${client.revenue.toLocaleString()}</p>
                      <p className="text-xs text-neutral-500">Monthly Revenue</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="mt-6 space-y-4">
          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Churn Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <p className="text-4xl font-bold text-red-600">2.4%</p>
                  <p className="text-sm text-neutral-500 mt-2">24 clients this month</p>
                  <div className="flex items-center justify-center gap-1 text-xs text-green-600 mt-1">
                    <TrendingDown className="h-3 w-3" />
                    <span>-0.8% vs last month</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Average Revenue Per Client</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <p className="text-4xl font-bold">$2,847</p>
                  <p className="text-sm text-neutral-500 mt-2">Per month</p>
                  <div className="flex items-center justify-center gap-1 text-xs text-green-600 mt-1">
                    <TrendingUp className="h-3 w-3" />
                    <span>+12% vs last month</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>AI API Usage</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <p className="text-4xl font-bold">{(systemMetrics.totalAIApiCalls / 1000000).toFixed(1)}M</p>
                  <p className="text-sm text-neutral-500 mt-2">Total API calls</p>
                  <div className="flex items-center justify-center gap-1 text-xs text-green-600 mt-1">
                    <TrendingUp className="h-3 w-3" />
                    <span>+28% vs last month</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="alerts" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>System Alerts & Notifications</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { type: 'warning', message: '12 clients approaching usage limit (>90%)', count: 12, time: '5 min ago' },
                  { type: 'error', message: '3 failed payment attempts require attention', count: 3, time: '15 min ago' },
                  { type: 'info', message: '48 new trial accounts created today', count: 48, time: '1 hour ago' },
                  { type: 'warning', message: '8 clients have not logged in for 30+ days', count: 8, time: '2 hours ago' },
                  { type: 'success', message: '156 projects completed this week', count: 156, time: '3 hours ago' },
                ].map((alert, index) => (
                  <div key={index} className="flex items-start gap-3 p-4 bg-neutral-50 rounded-lg border border-neutral-200">
                    <div className={`flex h-8 w-8 items-center justify-center rounded-full shrink-0 ${alert.type === 'error' ? 'bg-red-100' :
                      alert.type === 'warning' ? 'bg-amber-100' :
                        alert.type === 'success' ? 'bg-green-100' :
                          'bg-blue-100'
                      }`}>
                      <AlertTriangle className={`h-4 w-4 ${alert.type === 'error' ? 'text-red-600' :
                        alert.type === 'warning' ? 'text-amber-600' :
                          alert.type === 'success' ? 'text-green-600' :
                            'text-blue-600'
                        }`} />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">{alert.message}</p>
                      <p className="text-sm text-neutral-500 mt-1">{alert.time}</p>
                    </div>
                    <Button variant="outline" size="sm">
                      View
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
