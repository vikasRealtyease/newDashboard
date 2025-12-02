
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@realtyeaseai/ui';
import { Button } from '@realtyeaseai/ui';
import { Badge } from '@realtyeaseai/ui';
import { Avatar, AvatarFallback } from '@realtyeaseai/ui';
import { Progress } from '@realtyeaseai/ui';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@realtyeaseai/ui';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@realtyeaseai/ui';
import { Bot, Clock, CheckCircle, TrendingUp, Plus, Star, Award, Zap } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@realtyeaseai/ui';
import { Label } from '@realtyeaseai/ui';

const virtualAssistants = [
  {
    id: 1,
    name: 'Sarah Martinez',
    avatar: 'SM',
    role: 'Designer',
    plan: 'Full-Time',
    hoursUsed: 142,
    hoursTotal: 160,
    rate: '$25/hr',
    status: 'Active',
    rating: 4.9,
    tasksCompleted: 47,
    skills: ['UI/UX Design', 'Figma', 'Adobe XD', 'Prototyping'],
  },
  {
    id: 2,
    name: 'Mike Johnson',
    avatar: 'MJ',
    role: 'Developer',
    plan: 'Full-Time',
    hoursUsed: 128,
    hoursTotal: 160,
    rate: '$30/hr',
    status: 'Active',
    rating: 4.8,
    tasksCompleted: 38,
    skills: ['React', 'Node.js', 'TypeScript', 'API Development'],
  },
  {
    id: 3,
    name: 'Lisa Wong',
    avatar: 'LW',
    role: 'Content Writer',
    plan: 'Half-Time',
    hoursUsed: 65,
    hoursTotal: 80,
    rate: '$20/hr',
    status: 'Active',
    rating: 5.0,
    tasksCompleted: 52,
    skills: ['Copywriting', 'SEO', 'Blog Writing', 'Social Media'],
  },
  {
    id: 4,
    name: 'Emma Davis',
    avatar: 'ED',
    role: 'Marketing Specialist',
    plan: 'Half-Time',
    hoursUsed: 58,
    hoursTotal: 80,
    rate: '$22/hr',
    status: 'Active',
    rating: 4.7,
    tasksCompleted: 35,
    skills: ['Social Media', 'Email Marketing', 'Analytics', 'Campaigns'],
  },
];

const subscriptionPlans = [
  {
    id: 'half-time',
    name: 'Half-Time VA',
    hours: 80,
    description: 'Perfect for ongoing support and smaller projects',
    price: 1600,
    features: [
      '80 hours per month',
      'Dedicated VA',
      'Project management tools',
      'AI tools access',
      'Weekly progress reports',
      '48hr response time',
    ],
    popular: false,
  },
  {
    id: 'full-time',
    name: 'Full-Time VA',
    hours: 160,
    description: 'Ideal for scaling your business with dedicated support',
    price: 2880,
    features: [
      '160 hours per month',
      'Dedicated VA',
      'Priority support',
      'Advanced AI tools',
      'Daily progress reports',
      '24hr response time',
      'Free task management',
    ],
    popular: true,
  },
];

export function VAManagement() {
  const [hireDialogOpen, setHireDialogOpen] = useState(false);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">

        <Dialog open={hireDialogOpen} onOpenChange={setHireDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Hire New VA
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Hire Virtual Assistant</DialogTitle>
              <DialogDescription>Choose a plan and specialization for your new VA</DialogDescription>
            </DialogHeader>

            <div className="space-y-6 py-4">
              {/* Plans */}
              <div className="grid md:grid-cols-2 gap-4">
                {subscriptionPlans.map((plan) => (
                  <Card key={plan.id} className={`relative ${plan.popular ? 'border-2 border-violet-500' : ''} `}>
                    {plan.popular && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                        <Badge className="bg-violet-600 hover:bg-violet-700">Most Popular</Badge>
                      </div>
                    )}
                    <CardHeader>
                      <CardTitle>{plan.name}</CardTitle>
                      <CardDescription>{plan.description}</CardDescription>
                      <div className="mt-4">
                        <span className="text-4xl font-bold">${plan.price}</span>
                        <span className="text-neutral-500">/month</span>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-3">
                        {plan.features.map((feature, idx) => (
                          <li key={idx} className="flex items-center gap-2 text-sm">
                            <CheckCircle className="h-4 w-4 text-green-600 shrink-0" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                      <Button className="w-full mt-6" variant={plan.popular ? 'default' : 'outline'}>
                        Select {plan.name}
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* VA Specialization */}
              <div className="space-y-4">
                <h3 className="font-medium">Select VA Specialization</h3>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { label: 'Designer', icon: '🎨' },
                    { label: 'Developer', icon: '💻' },
                    { label: 'Content Writer', icon: '✍️' },
                    { label: 'Marketing Specialist', icon: '📊' },
                    { label: 'Data Analyst', icon: '📈' },
                    { label: 'Customer Support', icon: '💬' },
                    { label: 'Project Manager', icon: '📋' },
                    { label: 'Social Media Manager', icon: '📱' },
                  ].map((spec) => (
                    <Button key={spec.label} variant="outline" className="justify-start h-auto py-3">
                      <span className="mr-2 text-xl">{spec.icon}</span>
                      {spec.label}
                    </Button>
                  ))}
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-4 border-t">
                <Button variant="outline" onClick={() => setHireDialogOpen(false)}>Cancel</Button>
                <Button onClick={() => setHireDialogOpen(false)}>Continue to Payment</Button>
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
                <p className="text-sm text-neutral-600">Active VAs</p>
                <p className="text-2xl font-bold mt-1">{virtualAssistants.length}</p>
              </div>
              <Bot className="h-8 w-8 text-violet-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-neutral-600">Hours Used</p>
                <p className="text-2xl font-bold mt-1">
                  {virtualAssistants.reduce((sum, va) => sum + va.hoursUsed, 0)}
                </p>
              </div>
              <Clock className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-neutral-600">Tasks Completed</p>
                <p className="text-2xl font-bold mt-1">
                  {virtualAssistants.reduce((sum, va) => sum + va.tasksCompleted, 0)}
                </p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-neutral-600">Avg Rating</p>
                <p className="text-2xl font-bold mt-1">
                  {(virtualAssistants.reduce((sum, va) => sum + va.rating, 0) / virtualAssistants.length).toFixed(1)}
                </p>
              </div>
              <Star className="h-8 w-8 text-amber-500 fill-amber-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Virtual Assistants List */}
      <Tabs defaultValue="active">
        <TabsList>
          <TabsTrigger value="active">Active VAs ({virtualAssistants.length})</TabsTrigger>
          <TabsTrigger value="plans">Subscription Plans</TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="mt-6">
          <div className="grid gap-4 md:grid-cols-2">
            {virtualAssistants.map((va) => (
              <Card key={va.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-12 w-12">
                        <AvatarFallback className="bg-violet-100 text-violet-700">{va.avatar}</AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-medium">{va.name}</h3>
                        <p className="text-sm text-neutral-500">{va.role}</p>
                      </div>
                    </div>
                    <Badge variant="outline" className={va.plan === 'Full-Time' ? 'bg-violet-100 text-violet-700 border-violet-200' : 'bg-blue-100 text-blue-700 border-blue-200'}>
                      {va.plan}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Hours Usage */}
                  <div>
                    <div className="flex items-center justify-between text-sm mb-2">
                      <span className="text-neutral-600">Hours Used</span>
                      <span className="font-medium">{va.hoursUsed} / {va.hoursTotal} hrs</span>
                    </div>
                    <Progress value={(va.hoursUsed / va.hoursTotal) * 100} className="h-2" />
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-4 py-4 border-y border-neutral-100">
                    <div className="text-center">
                      <div className="flex items-center justify-center gap-1 text-amber-500 mb-1">
                        <Star className="h-4 w-4 fill-amber-500" />
                        <span className="font-bold">{va.rating}</span>
                      </div>
                      <p className="text-xs text-neutral-500">Rating</p>
                    </div>
                    <div className="text-center">
                      <p className="font-bold text-green-600">{va.tasksCompleted}</p>
                      <p className="text-xs text-neutral-500">Tasks Done</p>
                    </div>
                    <div className="text-center">
                      <p className="font-bold">{va.rate}</p>
                      <p className="text-xs text-neutral-500">Hourly Rate</p>
                    </div>
                  </div>

                  {/* Skills */}
                  <div>
                    <p className="text-sm font-medium mb-2">Skills</p>
                    <div className="flex flex-wrap gap-1.5">
                      {va.skills.map((skill, idx) => (
                        <Badge key={idx} variant="secondary" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-2 pt-2">
                    <Button variant="outline" size="sm" className="flex-1">View Details</Button>
                    <Button size="sm" className="flex-1">Assign Task</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="plans" className="mt-6">
          <div className="grid md:grid-cols-2 gap-6">
            {subscriptionPlans.map((plan) => (
              <Card key={plan.id} className={`relative ${plan.popular ? 'border-2 border-violet-500 shadow-lg' : ''} `}>
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <Badge className="bg-violet-600 hover:bg-violet-700">
                      <Award className="h-3 w-3 mr-1" />
                      Most Popular
                    </Badge>
                  </div>
                )}
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-2xl">{plan.name}</CardTitle>
                      <CardDescription className="mt-2">{plan.description}</CardDescription>
                    </div>
                    <div className={`h - 12 w - 12 rounded - xl flex items - center justify - center ${plan.popular ? 'bg-violet-100' : 'bg-blue-100'} `}>
                      <Clock className={`h - 6 w - 6 ${plan.popular ? 'text-violet-600' : 'text-blue-600'} `} />
                    </div>
                  </div>
                  <div className="mt-6">
                    <span className="text-5xl font-bold">${plan.price}</span>
                    <span className="text-neutral-500 text-lg">/month</span>
                    <p className="text-sm text-neutral-500 mt-2">${(plan.price / plan.hours).toFixed(2)}/hour</p>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-3">
                    {plan.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                  <Button className="w-full" size="lg" variant={plan.popular ? 'default' : 'outline'}>
                    <Plus className="h-4 w-4 mr-2" />
                    Hire {plan.name}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Additional Info */}
          <Card className="mt-6 bg-gradient-to-br from-violet-50 to-purple-50 border-violet-200">
            <CardContent className="pt-6">
              <div className="flex items-start gap-4">
                <div className="h-12 w-12 rounded-xl bg-violet-600 flex items-center justify-center shrink-0">
                  <Zap className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">AI-Powered Virtual Assistants</h3>
                  <p className="text-neutral-600 mb-4">
                    Our VAs work alongside advanced AI tools to complete tasks faster and more efficiently.
                    They have access to AI content generation, data analysis, automation tools, and more to scale your business.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary">AI Content Generator</Badge>
                    <Badge variant="secondary">Smart Automation</Badge>
                    <Badge variant="secondary">Data Analytics</Badge>
                    <Badge variant="secondary">24/7 AI Assistant</Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
