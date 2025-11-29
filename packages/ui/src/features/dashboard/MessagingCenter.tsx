"use client";

import { useState } from 'react';
import { Card, CardContent } from '../../card';
import { Button } from '../../button';
import { Input } from '../../input';
import { Avatar, AvatarFallback, AvatarImage } from '../../avatar';
import { Badge } from '../../badge';
import { Search, Send, Paperclip, MoreVertical, Phone, Video } from 'lucide-react';
import { ScrollArea } from '../../scroll-area';

const conversations = [
  {
    id: 1,
    name: 'Sarah Johnson',
    avatar: 'SJ',
    lastMessage: 'The project timeline looks good. Can we schedule a call?',
    time: '10:30 AM',
    unread: 2,
    online: true,
  },
  {
    id: 2,
    name: 'TechCorp Team',
    avatar: 'TC',
    lastMessage: "We've reviewed the mockups and they look fantastic!",
    time: '9:45 AM',
    unread: 0,
    online: false,
  },
  {
    id: 3,
    name: 'Michael Chen',
    avatar: 'MC',
    lastMessage: 'Payment has been processed successfully.',
    time: 'Yesterday',
    unread: 0,
    online: true,
  },
  {
    id: 4,
    name: 'Design Team',
    avatar: 'DT',
    lastMessage: 'Updated the brand guidelines document',
    time: 'Yesterday',
    unread: 5,
    online: false,
  },
  {
    id: 5,
    name: 'Emily Rodriguez',
    avatar: 'ER',
    lastMessage: 'Thanks for the quick turnaround!',
    time: '2 days ago',
    unread: 0,
    online: false,
  },
  {
    id: 6,
    name: 'DataViz Client',
    avatar: 'DV',
    lastMessage: 'The dashboard analytics are perfect.',
    time: '3 days ago',
    unread: 0,
    online: true,
  },
];

const messages = [
  {
    id: 1,
    sender: 'Sarah Johnson',
    isOwn: false,
    content: 'Hi! I wanted to discuss the project timeline.',
    time: '10:15 AM',
  },
  {
    id: 2,
    sender: 'You',
    isOwn: true,
    content: 'Sure! I have the updated timeline ready. Let me share it with you.',
    time: '10:18 AM',
  },
  {
    id: 3,
    sender: 'Sarah Johnson',
    isOwn: false,
    content: 'Great! Also, I reviewed the designs you sent yesterday. They look amazing!',
    time: '10:20 AM',
  },
  {
    id: 4,
    sender: 'You',
    isOwn: true,
    content: 'Thank you! I\'m glad you like them. We can implement the feedback you provided.',
    time: '10:25 AM',
  },
  {
    id: 5,
    sender: 'Sarah Johnson',
    isOwn: false,
    content: 'The project timeline looks good. Can we schedule a call?',
    time: '10:30 AM',
  },
];

export function MessagingCenter() {
  const [selectedConversation, setSelectedConversation] = useState(conversations[0]);
  const [messageInput, setMessageInput] = useState('');

  return (
    <div className="grid grid-cols-12 gap-6 h-[calc(100vh-200px)]">
      {/* Conversations List */}
      <Card className="col-span-12 md:col-span-4 lg:col-span-3">
        <CardContent className="p-4 h-full flex flex-col">
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
            <Input placeholder="Search messages..." className="pl-9" />
          </div>

          <ScrollArea className="flex-1 -mx-4 px-4">
            <div className="space-y-2">
              {conversations.map((conversation) => (
                <button
                  key={conversation.id}
                  onClick={() => setSelectedConversation(conversation)}
                  className={`w-full flex items-start gap-3 p-3 rounded-lg transition-colors text-left ${selectedConversation.id === conversation.id
                      ? 'bg-violet-50 border border-violet-200'
                      : 'hover:bg-neutral-50'
                    }`}
                >
                  <div className="relative">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback>{conversation.avatar}</AvatarFallback>
                    </Avatar>
                    {conversation.online && (
                      <div className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-white" />
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-medium truncate">{conversation.name}</span>
                      <span className="text-xs text-neutral-500 whitespace-nowrap ml-2">
                        {conversation.time}
                      </span>
                    </div>
                    <p className="text-sm text-neutral-600 truncate">{conversation.lastMessage}</p>
                  </div>

                  {conversation.unread > 0 && (
                    <Badge className="bg-violet-600 hover:bg-violet-700 min-w-[20px] h-5 flex items-center justify-center">
                      {conversation.unread}
                    </Badge>
                  )}
                </button>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>

      {/* Chat Area */}
      <Card className="col-span-12 md:col-span-8 lg:col-span-9">
        <CardContent className="p-0 h-full flex flex-col">
          {/* Chat Header */}
          <div className="flex items-center justify-between p-4 border-b border-neutral-200">
            <div className="flex items-center gap-3">
              <div className="relative">
                <Avatar className="h-10 w-10">
                  <AvatarFallback>{selectedConversation.avatar}</AvatarFallback>
                </Avatar>
                {selectedConversation.online && (
                  <div className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-white" />
                )}
              </div>
              <div>
                <h3 className="font-medium">{selectedConversation.name}</h3>
                <p className="text-sm text-neutral-500">
                  {selectedConversation.online ? 'Online' : 'Offline'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm">
                <Phone className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <Video className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Messages */}
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.isOwn ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex gap-2 max-w-[70%] ${message.isOwn ? 'flex-row-reverse' : 'flex-row'}`}>
                    {!message.isOwn && (
                      <Avatar className="h-8 w-8 mt-auto">
                        <AvatarFallback className="text-xs">{selectedConversation.avatar}</AvatarFallback>
                      </Avatar>
                    )}
                    <div>
                      <div
                        className={`rounded-lg px-4 py-2 ${message.isOwn
                            ? 'bg-violet-600 text-white'
                            : 'bg-neutral-100 text-neutral-900'
                          }`}
                      >
                        <p className="text-sm">{message.content}</p>
                      </div>
                      <span className="text-xs text-neutral-500 mt-1 block">
                        {message.time}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>

          {/* Message Input */}
          <div className="p-4 border-t border-neutral-200">
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm">
                <Paperclip className="h-4 w-4" />
              </Button>
              <Input
                placeholder="Type a message..."
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter' && messageInput.trim()) {
                    setMessageInput('');
                  }
                }}
                className="flex-1"
              />
              <Button size="sm">
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}