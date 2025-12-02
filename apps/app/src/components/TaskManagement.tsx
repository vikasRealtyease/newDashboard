import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@realtyeaseai/ui';
import { Badge } from '@realtyeaseai/ui';
import { Button } from '@realtyeaseai/ui';
import { Checkbox } from '@realtyeaseai/ui';
import { Avatar, AvatarFallback } from '@realtyeaseai/ui';
import { Plus, Search, Calendar, Flag, User } from 'lucide-react';
import { Input } from '@realtyeaseai/ui';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@realtyeaseai/ui';

const tasks = [
  {
    id: 1,
    title: 'Design landing page mockups',
    project: 'AI Marketing Campaign',
    priority: 'High',
    status: 'todo',
    assignee: 'JD',
    dueDate: '2025-11-28',
    tags: ['Design', 'UI/UX'],
  },
  {
    id: 2,
    title: 'Implement payment gateway',
    project: 'E-commerce Platform',
    priority: 'High',
    status: 'in-progress',
    assignee: 'SK',
    dueDate: '2025-11-26',
    tags: ['Development', 'Backend'],
  },
  {
    id: 3,
    title: 'Write API documentation',
    project: 'Mobile App Development',
    priority: 'Medium',
    status: 'in-progress',
    assignee: 'MR',
    dueDate: '2025-11-30',
    tags: ['Documentation'],
  },
  {
    id: 4,
    title: 'Update dashboard charts',
    project: 'Data Analytics Dashboard',
    priority: 'Low',
    status: 'todo',
    assignee: 'AJ',
    dueDate: '2025-12-01',
    tags: ['Frontend', 'Charts'],
  },
  {
    id: 5,
    title: 'Client feedback review',
    project: 'Content Management System',
    priority: 'High',
    status: 'in-progress',
    assignee: 'LT',
    dueDate: '2025-11-25',
    tags: ['Review', 'Client'],
  },
  {
    id: 6,
    title: 'Set up CI/CD pipeline',
    project: 'AI Marketing Campaign',
    priority: 'Medium',
    status: 'todo',
    assignee: 'NK',
    dueDate: '2025-12-05',
    tags: ['DevOps'],
  },
  {
    id: 7,
    title: 'Optimize database queries',
    project: 'E-commerce Platform',
    priority: 'Medium',
    status: 'completed',
    assignee: 'HK',
    dueDate: '2025-11-20',
    tags: ['Backend', 'Performance'],
  },
  {
    id: 8,
    title: 'Create user onboarding flow',
    project: 'Mobile App Development',
    priority: 'High',
    status: 'completed',
    assignee: 'BW',
    dueDate: '2025-11-18',
    tags: ['UX', 'Design'],
  },
];

export function TaskManagement() {
  const [selectedTab, setSelectedTab] = useState('all');

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'border-red-500 text-red-700';
      case 'Medium': return 'border-amber-500 text-amber-700';
      case 'Low': return 'border-blue-500 text-blue-700';
      default: return 'border-neutral-500 text-neutral-700';
    }
  };

  const filterTasks = (status: string) => {
    if (status === 'all') return tasks;
    return tasks.filter(task => task.status === status);
  };

  const TaskCard = ({ task }: { task: typeof tasks[0] }) => (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="pt-6">
        <div className="flex items-start gap-3">
          <Checkbox className="mt-1" />
          <div className="flex-1 min-w-0 space-y-3">
            <div>
              <h4 className="font-medium">{task.title}</h4>
              <p className="text-sm text-neutral-500 mt-1">{task.project}</p>
            </div>

            <div className="flex flex-wrap gap-2">
              {task.tags.map((tag, idx) => (
                <Badge key={idx} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>

            <div className="flex items-center justify-between pt-2">
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-1">
                  <Flag className={`h-3 w-3 ${getPriorityColor(task.priority).split(' ')[0]}`} />
                  <span className="text-neutral-600">{task.priority}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="h-3 w-3 text-neutral-400" />
                  <span className="text-neutral-600">{task.dueDate}</span>
                </div>
              </div>
              <Avatar className="h-7 w-7">
                <AvatarFallback className="text-xs">{task.assignee}</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      {/* Header Actions */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
          <Input placeholder="Search tasks..." className="pl-9" />
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          New Task
        </Button>
      </div>

      {/* Task Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-sm text-neutral-600">Total Tasks</p>
              <p className="text-3xl font-bold mt-2">{tasks.length}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-sm text-neutral-600">To Do</p>
              <p className="text-3xl font-bold mt-2 text-blue-600">
                {tasks.filter(t => t.status === 'todo').length}
              </p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-sm text-neutral-600">In Progress</p>
              <p className="text-3xl font-bold mt-2 text-amber-600">
                {tasks.filter(t => t.status === 'in-progress').length}
              </p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-sm text-neutral-600">Completed</p>
              <p className="text-3xl font-bold mt-2 text-green-600">
                {tasks.filter(t => t.status === 'completed').length}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tasks Tabs */}
      <Tabs value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList>
          <TabsTrigger value="all">All Tasks</TabsTrigger>
          <TabsTrigger value="todo">To Do</TabsTrigger>
          <TabsTrigger value="in-progress">In Progress</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
        </TabsList>

        <TabsContent value={selectedTab} className="mt-6">
          <div className="grid gap-4 md:grid-cols-2">
            {filterTasks(selectedTab).map((task) => (
              <TaskCard key={task.id} task={task} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
