import { Card, CardContent, CardHeader, CardTitle } from '@realtyeaseai/ui';
import { LineChart, Line, BarChart, Bar, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { TrendingUp, TrendingDown, DollarSign, Users, Briefcase, Zap } from 'lucide-react';

const revenueData = [
  { month: 'Jan', revenue: 45000, expenses: 32000, profit: 13000 },
  { month: 'Feb', revenue: 52000, expenses: 35000, profit: 17000 },
  { month: 'Mar', revenue: 48000, expenses: 33000, profit: 15000 },
  { month: 'Apr', revenue: 61000, expenses: 38000, profit: 23000 },
  { month: 'May', revenue: 55000, expenses: 36000, profit: 19000 },
  { month: 'Jun', revenue: 67000, expenses: 40000, profit: 27000 },
  { month: 'Jul', revenue: 72000, expenses: 42000, profit: 30000 },
  { month: 'Aug', revenue: 69000, expenses: 41000, profit: 28000 },
  { month: 'Sep', revenue: 78000, expenses: 44000, profit: 34000 },
  { month: 'Oct', revenue: 84000, expenses: 46000, profit: 38000 },
  { month: 'Nov', revenue: 91000, expenses: 48000, profit: 43000 },
  { month: 'Dec', revenue: 96000, expenses: 50000, profit: 46000 },
];

const projectStats = [
  { name: 'Mon', completed: 12, inProgress: 8 },
  { name: 'Tue', completed: 15, inProgress: 10 },
  { name: 'Wed', completed: 10, inProgress: 12 },
  { name: 'Thu', completed: 18, inProgress: 9 },
  { name: 'Fri', completed: 14, inProgress: 11 },
  { name: 'Sat', completed: 8, inProgress: 5 },
  { name: 'Sun', completed: 6, inProgress: 4 },
];

const aiUsageData = [
  { tool: 'Content Gen', usage: 340 },
  { tool: 'Data Analysis', usage: 280 },
  { tool: 'Image Gen', usage: 190 },
  { tool: 'Code Assist', usage: 250 },
  { tool: 'Chat Support', usage: 420 },
];

export function DashboardOverview() {
  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-neutral-600">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-neutral-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$818,000</div>
            <div className="flex items-center gap-1 text-xs text-green-600 mt-1">
              <TrendingUp className="h-3 w-3" />
              <span>+12.5% from last month</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-neutral-600">Active Projects</CardTitle>
            <Briefcase className="h-4 w-4 text-neutral-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <div className="flex items-center gap-1 text-xs text-green-600 mt-1">
              <TrendingUp className="h-3 w-3" />
              <span>+3 new this month</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-neutral-600">Active VAs</CardTitle>
            <Users className="h-4 w-4 text-neutral-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4</div>
            <div className="flex items-center gap-1 text-xs text-blue-600 mt-1">
              <Zap className="h-3 w-3" />
              <span>393 hrs used this month</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-neutral-600">AI API Calls</CardTitle>
            <Zap className="h-4 w-4 text-neutral-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1.48M</div>
            <div className="flex items-center gap-1 text-xs text-green-600 mt-1">
              <TrendingUp className="h-3 w-3" />
              <span>+24.8% from last month</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Revenue Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Revenue Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={350}>
            <AreaChart data={revenueData}>
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorProfit" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e5e5" />
              <XAxis dataKey="month" stroke="#737373" />
              <YAxis stroke="#737373" />
              <Tooltip
                contentStyle={{ backgroundColor: 'white', border: '1px solid #e5e5e5', borderRadius: '8px' }}
              />
              <Legend />
              <Area type="monotone" dataKey="revenue" stroke="#8b5cf6" fillOpacity={1} fill="url(#colorRevenue)" strokeWidth={2} />
              <Area type="monotone" dataKey="profit" stroke="#10b981" fillOpacity={1} fill="url(#colorProfit)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Project Stats and AI Usage */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Weekly Project Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={projectStats}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e5e5" />
                <XAxis dataKey="name" stroke="#737373" />
                <YAxis stroke="#737373" />
                <Tooltip
                  contentStyle={{ backgroundColor: 'white', border: '1px solid #e5e5e5', borderRadius: '8px' }}
                />
                <Legend />
                <Bar dataKey="completed" fill="#10b981" radius={[4, 4, 0, 0]} />
                <Bar dataKey="inProgress" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>AI Tools Usage</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={aiUsageData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e5e5" />
                <XAxis type="number" stroke="#737373" />
                <YAxis dataKey="tool" type="category" stroke="#737373" width={100} />
                <Tooltip
                  contentStyle={{ backgroundColor: 'white', border: '1px solid #e5e5e5', borderRadius: '8px' }}
                />
                <Bar dataKey="usage" fill="#8b5cf6" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { action: 'New project created', detail: 'AI Marketing Campaign', time: '5 minutes ago', type: 'project' },
              { action: 'Invoice paid', detail: 'Client: Acme Corp - $12,500', time: '23 minutes ago', type: 'payment' },
              { action: 'AI tool used', detail: 'Content Generator - 5 articles', time: '1 hour ago', type: 'ai' },
              { action: 'Task completed', detail: 'Website redesign mockups', time: '2 hours ago', type: 'task' },
              { action: 'New message', detail: 'From Sarah Johnson', time: '3 hours ago', type: 'message' },
            ].map((activity, index) => (
              <div key={index} className="flex items-start gap-4 pb-4 border-b border-neutral-100 last:border-0 last:pb-0">
                <div className={`flex h-8 w-8 items-center justify-center rounded-full ${activity.type === 'project' ? 'bg-blue-100' :
                    activity.type === 'payment' ? 'bg-green-100' :
                      activity.type === 'ai' ? 'bg-purple-100' :
                        activity.type === 'task' ? 'bg-amber-100' :
                          'bg-pink-100'
                  }`}>
                  {activity.type === 'project' && <Briefcase className="h-4 w-4 text-blue-600" />}
                  {activity.type === 'payment' && <DollarSign className="h-4 w-4 text-green-600" />}
                  {activity.type === 'ai' && <Zap className="h-4 w-4 text-purple-600" />}
                  {activity.type === 'task' && <TrendingUp className="h-4 w-4 text-amber-600" />}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium">{activity.action}</p>
                  <p className="text-sm text-neutral-500">{activity.detail}</p>
                </div>
                <span className="text-xs text-neutral-400 whitespace-nowrap">{activity.time}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}