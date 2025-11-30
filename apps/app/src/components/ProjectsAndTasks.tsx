import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@repo/ui';
import { Button } from '@repo/ui';
import { Badge } from '@repo/ui';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@repo/ui';
import { Input } from '@repo/ui';
import { Label } from '@repo/ui';
import { Textarea } from '@repo/ui';
import { Avatar, AvatarFallback } from '@repo/ui';
import { Progress } from '@repo/ui';
import { Plus, Search, FolderOpen, CheckCircle2, Clock, AlertCircle, User, Calendar, MoreVertical } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@repo/ui';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@repo/ui';

const projects = [
  {
    id: 1,
    name: 'Website Redesign',
    client: 'TechCorp Inc.',
    status: 'In Progress',
    progress: 65,
    dueDate: '2025-12-15',
    tasks: [
      { id: 1, title: 'Design homepage mockup', status: 'Completed', assignee: 'VA-Sarah', priority: 'High', dueDate: '2025-11-20' },
      { id: 2, title: 'Develop landing page', status: 'In Progress', assignee: 'VA-Mike', priority: 'High', dueDate: '2025-11-28' },
      { id: 3, title: 'Write copy for about page', status: 'In Progress', assignee: 'VA-Lisa', priority: 'Medium', dueDate: '2025-11-30' },
      { id: 4, title: 'Set up analytics tracking', status: 'To Do', assignee: 'Unassigned', priority: 'Low', dueDate: '2025-12-05' },
    ],
  },
  {
    id: 2,
    name: 'Marketing Campaign Q4',
    client: 'Internal',
    status: 'In Progress',
    progress: 42,
    dueDate: '2025-12-31',
    tasks: [
      { id: 5, title: 'Create social media content calendar', status: 'Completed', assignee: 'VA-Emma', priority: 'High', dueDate: '2025-11-15' },
      { id: 6, title: 'Design ad creatives', status: 'In Progress', assignee: 'VA-Sarah', priority: 'High', dueDate: '2025-11-25' },
      { id: 7, title: 'Set up email automation', status: 'To Do', assignee: 'VA-Mike', priority: 'Medium', dueDate: '2025-12-01' },
      { id: 8, title: 'Write blog posts', status: 'To Do', assignee: 'Unassigned', priority: 'Medium', dueDate: '2025-12-10' },
    ],
  },
  {
    id: 3,
    name: 'Product Launch',
    client: 'ShopPro Ltd.',
    status: 'Planning',
    progress: 18,
    dueDate: '2026-02-01',
    tasks: [
      { id: 9, title: 'Market research', status: 'In Progress', assignee: 'VA-Lisa', priority: 'High', dueDate: '2025-11-30' },
      { id: 10, title: 'Competitor analysis', status: 'To Do', assignee: 'Unassigned', priority: 'High', dueDate: '2025-12-05' },
      { id: 11, title: 'Create launch timeline', status: 'To Do', assignee: 'Unassigned', priority: 'Medium', dueDate: '2025-12-10' },
    ],
  },
];

const virtualAssistants = [
  { id: 'va-1', name: 'VA-Sarah', role: 'Designer', avatar: 'VS', availability: 'Available' },
  { id: 'va-2', name: 'VA-Mike', role: 'Developer', avatar: 'VM', availability: 'Busy' },
  { id: 'va-3', name: 'VA-Lisa', role: 'Content Writer', avatar: 'VL', availability: 'Available' },
  { id: 'va-4', name: 'VA-Emma', role: 'Marketing', avatar: 'VE', availability: 'Available' },
];

export function ProjectsAndTasks() {
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [createTaskDialogOpen, setCreateTaskDialogOpen] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed': return 'bg-green-100 text-green-700 border-green-200';
      case 'In Progress': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'To Do': return 'bg-amber-100 text-amber-700 border-amber-200';
      case 'Planning': return 'bg-purple-100 text-purple-700 border-purple-200';
      default: return 'bg-neutral-100 text-neutral-700 border-neutral-200';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'text-red-600';
      case 'Medium': return 'text-amber-600';
      case 'Low': return 'text-blue-600';
      default: return 'text-neutral-600';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Completed': return <CheckCircle2 className="h-4 w-4" />;
      case 'In Progress': return <Clock className="h-4 w-4" />;
      default: return <AlertCircle className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Actions */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
          <Input placeholder="Search projects and tasks..." className="pl-9" />
        </div>
        <Dialog open={createDialogOpen} onOpenChange={setCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Create Project
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Create New Project</DialogTitle>
              <DialogDescription>Create a project and add tasks to get started</DialogDescription>
            </DialogHeader>

            <div className="space-y-6 py-4">
              {/* Project Details */}
              <div className="space-y-4">
                <h3 className="font-medium">Project Details</h3>
                <div className="grid gap-4">
                  <div className="space-y-2">
                    <Label>Project Name</Label>
                    <Input placeholder="Enter project name" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Client</Label>
                      <Input placeholder="Client name" />
                    </div>
                    <div className="space-y-2">
                      <Label>Due Date</Label>
                      <Input type="date" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Description</Label>
                    <Textarea placeholder="Project description" rows={3} />
                  </div>
                </div>
              </div>

              {/* Tasks */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium">Tasks</h3>
                  <Button variant="outline" size="sm">
                    <Plus className="h-3 w-3 mr-1" />
                    Add Task
                  </Button>
                </div>

                <div className="border border-neutral-200 rounded-lg p-4 space-y-3">
                  <div className="grid gap-3">
                    <Input placeholder="Task title" />
                    <div className="grid grid-cols-3 gap-3">
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Assign to VA" />
                        </SelectTrigger>
                        <SelectContent>
                          {virtualAssistants.map((va) => (
                            <SelectItem key={va.id} value={va.id}>
                              {va.name} - {va.role}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Priority" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="high">High</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="low">Low</SelectItem>
                        </SelectContent>
                      </Select>
                      <Input type="date" placeholder="Due date" />
                    </div>
                    <Textarea placeholder="Task description (optional)" rows={2} />
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setCreateDialogOpen(false)}>Cancel</Button>
                <Button onClick={() => setCreateDialogOpen(false)}>Create Project</Button>
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
                <p className="text-sm text-neutral-600">Total Projects</p>
                <p className="text-2xl font-bold mt-1">{projects.length}</p>
              </div>
              <FolderOpen className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-neutral-600">In Progress</p>
                <p className="text-2xl font-bold mt-1">{projects.filter(p => p.status === 'In Progress').length}</p>
              </div>
              <Clock className="h-8 w-8 text-amber-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-neutral-600">Total Tasks</p>
                <p className="text-2xl font-bold mt-1">{projects.reduce((sum, p) => sum + p.tasks.length, 0)}</p>
              </div>
              <CheckCircle2 className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-neutral-600">Completion Rate</p>
                <p className="text-2xl font-bold mt-1">67%</p>
              </div>
              <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
                <span className="text-sm font-bold text-green-600">↑</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Projects List */}
      <div className="grid gap-4">
        {projects.map((project) => (
          <Card key={project.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <CardTitle className="text-xl">{project.name}</CardTitle>
                    <Badge variant="outline" className={getStatusColor(project.status)}>
                      {project.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-neutral-500">{project.client}</p>
                </div>
                <Button variant="ghost" size="sm">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Progress */}
              <div>
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="text-neutral-600">Overall Progress</span>
                  <span className="font-medium">{project.progress}%</span>
                </div>
                <Progress value={project.progress} className="h-2" />
              </div>

              {/* Project Info */}
              <div className="flex items-center gap-4 text-sm text-neutral-600">
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  <span>Due: {project.dueDate}</span>
                </div>
                <div className="flex items-center gap-1">
                  <CheckCircle2 className="h-4 w-4" />
                  <span>{project.tasks.filter(t => t.status === 'Completed').length} / {project.tasks.length} tasks</span>
                </div>
              </div>

              {/* Tasks */}
              <div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full justify-start mb-3"
                  onClick={() => setSelectedProject(selectedProject?.id === project.id ? null : project)}
                >
                  <FolderOpen className="h-4 w-4 mr-2" />
                  {selectedProject?.id === project.id ? 'Hide' : 'Show'} Tasks ({project.tasks.length})
                </Button>

                {selectedProject?.id === project.id && (
                  <div className="space-y-2 pl-6">
                    {project.tasks.map((task) => (
                      <div key={task.id} className="flex items-center gap-3 p-3 bg-neutral-50 rounded-lg border border-neutral-200">
                        <div className={`${getStatusColor(task.status)} p-1.5 rounded`}>
                          {getStatusIcon(task.status)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm">{task.title}</p>
                          <div className="flex items-center gap-3 mt-1 text-xs text-neutral-500">
                            <span className={getPriorityColor(task.priority)}>{task.priority}</span>
                            <span>Due: {task.dueDate}</span>
                          </div>
                        </div>
                        <Avatar className="h-7 w-7">
                          <AvatarFallback className="text-xs bg-violet-100 text-violet-700">
                            {task.assignee === 'Unassigned' ? '?' : task.assignee.substring(3, 5)}
                          </AvatarFallback>
                        </Avatar>
                      </div>
                    ))}
                    <Button variant="outline" size="sm" className="w-full" onClick={() => setCreateTaskDialogOpen(true)}>
                      <Plus className="h-3 w-3 mr-1" />
                      Add Task
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Add Task Dialog */}
      <Dialog open={createTaskDialogOpen} onOpenChange={setCreateTaskDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Task</DialogTitle>
            <DialogDescription>Add a task to {selectedProject?.name}</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Task Title</Label>
              <Input placeholder="Enter task title" />
            </div>
            <div className="space-y-2">
              <Label>Description</Label>
              <Textarea placeholder="Task description" rows={3} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Assign to VA</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select VA" />
                  </SelectTrigger>
                  <SelectContent>
                    {virtualAssistants.map((va) => (
                      <SelectItem key={va.id} value={va.id}>
                        {va.name} - {va.role}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Priority</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="low">Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label>Due Date</Label>
              <Input type="date" />
            </div>
            <div className="flex justify-end gap-2 pt-4">
              <Button variant="outline" onClick={() => setCreateTaskDialogOpen(false)}>Cancel</Button>
              <Button onClick={() => setCreateTaskDialogOpen(false)}>Create Task</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
