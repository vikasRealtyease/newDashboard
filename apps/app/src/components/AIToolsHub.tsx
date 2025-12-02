import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@realtyeaseai/ui';
import { Button } from '@realtyeaseai/ui';
import { Badge } from '@realtyeaseai/ui';
import { Input } from '@realtyeaseai/ui';
import { Textarea } from '@realtyeaseai/ui';
import { Bot, Sparkles, FileText, Image, Code, MessageSquare, TrendingUp, Zap } from 'lucide-react';
import { Progress } from '@realtyeaseai/ui';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@realtyeaseai/ui';

const aiTools = [
  {
    id: 1,
    name: 'Content Generator',
    icon: FileText,
    description: 'Generate high-quality content for blogs, social media, and marketing',
    usage: '340 / 500',
    usagePercent: 68,
    color: 'bg-blue-500',
  },
  {
    id: 2,
    name: 'Image Creator',
    icon: Image,
    description: 'Create stunning images and graphics using AI',
    usage: '190 / 300',
    usagePercent: 63,
    color: 'bg-purple-500',
  },
  {
    id: 3,
    name: 'Code Assistant',
    icon: Code,
    description: 'Get help with coding, debugging, and optimization',
    usage: '250 / 400',
    usagePercent: 62.5,
    color: 'bg-green-500',
  },
  {
    id: 4,
    name: 'Chat Support',
    icon: MessageSquare,
    description: 'AI-powered customer support and chatbot',
    usage: '420 / 600',
    usagePercent: 70,
    color: 'bg-pink-500',
  },
  {
    id: 5,
    name: 'Data Analyzer',
    icon: TrendingUp,
    description: 'Analyze data and generate insights automatically',
    usage: '280 / 500',
    usagePercent: 56,
    color: 'bg-amber-500',
  },
  {
    id: 6,
    name: 'Task Automation',
    icon: Zap,
    description: 'Automate repetitive tasks and workflows',
    usage: '165 / 300',
    usagePercent: 55,
    color: 'bg-cyan-500',
  },
];

const recentAITasks = [
  {
    id: 1,
    tool: 'Content Generator',
    task: 'Blog post: "Top 10 AI Trends in 2025"',
    status: 'Completed',
    time: '5 minutes ago',
  },
  {
    id: 2,
    tool: 'Image Creator',
    task: 'Social media banner for product launch',
    status: 'Completed',
    time: '23 minutes ago',
  },
  {
    id: 3,
    tool: 'Code Assistant',
    task: 'Optimize React component performance',
    status: 'Completed',
    time: '1 hour ago',
  },
  {
    id: 4,
    tool: 'Data Analyzer',
    task: 'Monthly revenue report analysis',
    status: 'Processing',
    time: '2 hours ago',
  },
];

export function AIToolsHub() {
  const [activeTab, setActiveTab] = useState('tools');
  const [prompt, setPrompt] = useState('');

  return (
    <div className="space-y-6">
      {/* AI Assistant Card */}
      <Card className="border-2 border-violet-200 bg-gradient-to-br from-violet-50 to-purple-50">
        <CardContent className="pt-6">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-purple-600">
              <Bot className="h-6 w-6 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-lg mb-1">AI Virtual Assistant</h3>
              <p className="text-sm text-neutral-600 mb-4">
                Your intelligent assistant is ready to help with tasks, answer questions, and automate workflows.
              </p>
              <div className="flex gap-2">
                <Input
                  placeholder="Ask me anything or describe a task..."
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  className="flex-1"
                />
                <Button>
                  <Sparkles className="h-4 w-4 mr-2" />
                  Ask AI
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-sm text-neutral-600">Total API Calls</p>
              <p className="text-3xl font-bold mt-2">1.48M</p>
              <p className="text-xs text-green-600 mt-1">+24.8% this month</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-sm text-neutral-600">Active Tools</p>
              <p className="text-3xl font-bold mt-2">{aiTools.length}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-sm text-neutral-600">Tasks Completed</p>
              <p className="text-3xl font-bold mt-2">12,847</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-sm text-neutral-600">Time Saved</p>
              <p className="text-3xl font-bold mt-2">342h</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="tools">AI Tools</TabsTrigger>
          <TabsTrigger value="recent">Recent Tasks</TabsTrigger>
          <TabsTrigger value="playground">AI Playground</TabsTrigger>
        </TabsList>

        <TabsContent value="tools" className="mt-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {aiTools.map((tool) => (
              <Card key={tool.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${tool.color}`}>
                      <tool.icon className="h-5 w-5 text-white" />
                    </div>
                    <Badge variant="secondary">Active</Badge>
                  </div>
                  <CardTitle className="mt-4">{tool.name}</CardTitle>
                  <CardDescription>{tool.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between text-sm mb-2">
                      <span className="text-neutral-600">Usage this month</span>
                      <span className="font-medium">{tool.usage}</span>
                    </div>
                    <Progress value={tool.usagePercent} className="h-2" />
                  </div>
                  <Button className="w-full" variant="outline">
                    <Sparkles className="h-4 w-4 mr-2" />
                    Use Tool
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="recent" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Recent AI Tasks</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentAITasks.map((task) => (
                  <div key={task.id} className="flex items-start gap-4 pb-4 border-b border-neutral-100 last:border-0 last:pb-0">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-violet-100">
                      <Bot className="h-5 w-5 text-violet-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="font-medium">{task.tool}</p>
                        <Badge
                          variant="outline"
                          className={task.status === 'Completed' ? 'bg-green-100 text-green-700 border-green-200' : 'bg-amber-100 text-amber-700 border-amber-200'}
                        >
                          {task.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-neutral-600">{task.task}</p>
                      <p className="text-xs text-neutral-400 mt-1">{task.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="playground" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>AI Playground</CardTitle>
              <CardDescription>Test and experiment with AI capabilities</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Select AI Model</label>
                <select className="w-full h-10 px-3 rounded-md border border-neutral-200 bg-white">
                  <option>GPT-4 Turbo</option>
                  <option>Claude 3 Opus</option>
                  <option>Gemini Pro</option>
                  <option>Llama 3</option>
                </select>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Your Prompt</label>
                <Textarea
                  placeholder="Enter your prompt here..."
                  rows={6}
                  className="resize-none"
                />
              </div>

              <div className="flex gap-2">
                <Button className="flex-1">
                  <Sparkles className="h-4 w-4 mr-2" />
                  Generate
                </Button>
                <Button variant="outline">Clear</Button>
              </div>

              <div className="mt-6 p-4 bg-neutral-50 rounded-lg border border-neutral-200">
                <p className="text-sm text-neutral-600 mb-2">AI Response:</p>
                <p className="text-sm text-neutral-500 italic">Your generated content will appear here...</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
