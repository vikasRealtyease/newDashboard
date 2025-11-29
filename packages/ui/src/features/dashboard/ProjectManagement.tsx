import { Card, CardContent, CardHeader, CardTitle } from '../../card';
import { Badge } from '../../badge';
import { Button } from '../../button';
import { Progress } from '../../progress';
import { Avatar, AvatarFallback, AvatarImage } from '../../avatar';
import { Plus, Search, Filter, MoreVertical, Users, Calendar, Target } from 'lucide-react';
import { Input } from '../../input';

const projects = [
  {
    id: 1,
    name: 'AI Marketing Campaign',
    client: 'TechCorp Inc.',
    status: 'In Progress',
    progress: 65,
    dueDate: '2025-12-15',
    budget: '$45,000',
    team: ['JD', 'SK', 'MR'],
    tasks: { total: 24, completed: 16 },
  },
  {
    id: 2,
    name: 'E-commerce Platform Redesign',
    client: 'ShopPro Ltd.',
    status: 'In Progress',
    progress: 42,
    dueDate: '2026-01-20',
    budget: '$68,000',
    team: ['AJ', 'LT', 'NK'],
    tasks: { total: 32, completed: 14 },
  },
  {
    id: 3,
    name: 'Mobile App Development',
    client: 'FinanceFlow',
    status: 'Planning',
    progress: 15,
    dueDate: '2026-02-28',
    budget: '$95,000',
    team: ['BW', 'HK'],
    tasks: { total: 48, completed: 8 },
  },
  {
    id: 4,
    name: 'Data Analytics Dashboard',
    client: 'DataViz Co.',
    status: 'In Progress',
    progress: 88,
    dueDate: '2025-12-05',
    budget: '$32,000',
    team: ['JD', 'MR', 'TY', 'AJ'],
    tasks: { total: 18, completed: 16 },
  },
  {
    id: 5,
    name: 'Content Management System',
    client: 'MediaHub',
    status: 'Review',
    progress: 95,
    dueDate: '2025-11-30',
    budget: '$54,000',
    team: ['SK', 'LT'],
    tasks: { total: 22, completed: 21 },
  },
  {
    id: 6,
    name: 'AI Chatbot Integration',
    client: 'Support Plus',
    status: 'Completed',
    progress: 100,
    dueDate: '2025-11-15',
    budget: '$28,000',
    team: ['NK', 'HK'],
    tasks: { total: 15, completed: 15 },
  },
];

export function ProjectManagement() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed': return 'bg-green-100 text-green-700 border-green-200';
      case 'In Progress': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'Review': return 'bg-purple-100 text-purple-700 border-purple-200';
      case 'Planning': return 'bg-amber-100 text-amber-700 border-amber-200';
      default: return 'bg-neutral-100 text-neutral-700 border-neutral-200';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Actions */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
          <Input placeholder="Search projects..." className="pl-9" />
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            New Project
          </Button>
        </div>
      </div>

      {/* Project Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-neutral-600">Total Projects</p>
                <p className="text-2xl font-bold mt-1">156</p>
              </div>
              <Target className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-neutral-600">In Progress</p>
                <p className="text-2xl font-bold mt-1">43</p>
              </div>
              <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                <span className="text-sm font-bold text-blue-600">43</span>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-neutral-600">Completed</p>
                <p className="text-2xl font-bold mt-1">98</p>
              </div>
              <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
                <span className="text-sm font-bold text-green-600">98</span>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-neutral-600">Total Budget</p>
                <p className="text-2xl font-bold mt-1">$4.2M</p>
              </div>
              <div className="h-8 w-8 rounded-full bg-purple-100 flex items-center justify-center">
                <span className="text-sm font-bold text-purple-600">$</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Projects Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <Card key={project.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0">
                  <CardTitle className="text-lg">{project.name}</CardTitle>
                  <p className="text-sm text-neutral-500 mt-1">{project.client}</p>
                </div>
                <Button variant="ghost" size="sm">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </div>
              <Badge variant="outline" className={getStatusColor(project.status)}>
                {project.status}
              </Badge>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="text-neutral-600">Progress</span>
                  <span className="font-medium">{project.progress}%</span>
                </div>
                <Progress value={project.progress} className="h-2" />
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-neutral-600">Budget</p>
                  <p className="font-medium mt-1">{project.budget}</p>
                </div>
                <div>
                  <p className="text-neutral-600">Tasks</p>
                  <p className="font-medium mt-1">{project.tasks.completed}/{project.tasks.total}</p>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-neutral-100">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-neutral-400" />
                  <span className="text-sm text-neutral-600">{project.dueDate}</span>
                </div>
                <div className="flex -space-x-2">
                  {project.team.map((member, idx) => (
                    <Avatar key={idx} className="h-7 w-7 border-2 border-white">
                      <AvatarFallback className="text-xs">{member}</AvatarFallback>
                    </Avatar>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
