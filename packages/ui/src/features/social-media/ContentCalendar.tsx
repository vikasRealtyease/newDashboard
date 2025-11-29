"use client";

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../card';
import { Button } from '../../button';
import { Badge } from '../../badge';
import { Calendar, ChevronLeft, ChevronRight, Plus, Filter, Grid3x3, List } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../tabs';

interface Post {
    id: string;
    title: string;
    platform: string[];
    scheduledDate: Date;
    status: 'draft' | 'pending_approval' | 'approved' | 'scheduled' | 'published' | 'failed';
    caption: string;
    mediaUrl?: string;
    hashtags: string[];
}

const mockPosts: Post[] = [
    {
        id: '1',
        title: 'New Property Listing - Downtown Condo',
        platform: ['facebook', 'instagram'],
        scheduledDate: new Date(2025, 10, 28, 10, 0),
        status: 'scheduled',
        caption: 'Beautiful 2BR condo in the heart of downtown! 🏙️',
        hashtags: ['#realestate', '#condo', '#downtown'],
    },
    {
        id: '2',
        title: 'Market Update - November 2025',
        platform: ['linkedin', 'facebook'],
        scheduledDate: new Date(2025, 10, 29, 14, 0),
        status: 'pending_approval',
        caption: 'November market insights for savvy investors 📊',
        hashtags: ['#marketupdate', '#realestate'],
    },
    {
        id: '3',
        title: 'Client Testimonial - Happy Homeowners',
        platform: ['instagram', 'facebook', 'twitter'],
        scheduledDate: new Date(2025, 10, 30, 9, 0),
        status: 'approved',
        caption: 'Another happy family in their dream home! ❤️🏡',
        hashtags: ['#testimonial', '#happyclients'],
    },
];

export function ContentCalendar() {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [viewMode, setViewMode] = useState<'calendar' | 'list'>('calendar');
    const [posts] = useState<Post[]>(mockPosts);

    const getStatusColor = (status: Post['status']) => {
        switch (status) {
            case 'draft': return 'bg-gray-100 text-gray-700 border-gray-200';
            case 'pending_approval': return 'bg-amber-100 text-amber-700 border-amber-200';
            case 'approved': return 'bg-green-100 text-green-700 border-green-200';
            case 'scheduled': return 'bg-blue-100 text-blue-700 border-blue-200';
            case 'published': return 'bg-purple-100 text-purple-700 border-purple-200';
            case 'failed': return 'bg-red-100 text-red-700 border-red-200';
            default: return 'bg-gray-100 text-gray-700 border-gray-200';
        }
    };

    const getPlatformIcon = (platform: string) => {
        const icons: Record<string, string> = {
            facebook: '📘',
            instagram: '📷',
            linkedin: '💼',
            twitter: '🐦',
            tiktok: '🎵',
        };
        return icons[platform] || '📱';
    };

    const getDaysInMonth = (date: Date) => {
        const year = date.getFullYear();
        const month = date.getMonth();
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const daysInMonth = lastDay.getDate();
        const startingDayOfWeek = firstDay.getDay();

        return { daysInMonth, startingDayOfWeek, year, month };
    };

    const getPostsForDate = (date: Date) => {
        return posts.filter(post => {
            const postDate = new Date(post.scheduledDate);
            return postDate.toDateString() === date.toDateString();
        });
    };

    const { daysInMonth, startingDayOfWeek, year, month } = getDaysInMonth(currentDate);

    const previousMonth = () => {
        setCurrentDate(new Date(year, month - 1, 1));
    };

    const nextMonth = () => {
        setCurrentDate(new Date(year, month + 1, 1));
    };

    const monthNames = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    return (
        <div className="space-y-6">
            {/* Stats */}
            <div className="grid gap-4 md:grid-cols-4">
                <Card>
                    <CardContent className="pt-6">
                        <div className="text-center">
                            <p className="text-sm text-neutral-600">Scheduled</p>
                            <p className="text-3xl font-bold mt-2 text-blue-600">12</p>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="pt-6">
                        <div className="text-center">
                            <p className="text-sm text-neutral-600">Pending Approval</p>
                            <p className="text-3xl font-bold mt-2 text-amber-600">5</p>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="pt-6">
                        <div className="text-center">
                            <p className="text-sm text-neutral-600">Published</p>
                            <p className="text-3xl font-bold mt-2 text-green-600">48</p>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="pt-6">
                        <div className="text-center">
                            <p className="text-sm text-neutral-600">Drafts</p>
                            <p className="text-3xl font-bold mt-2 text-gray-600">8</p>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* View Tabs */}
            <Tabs value={viewMode} onValueChange={(v) => setViewMode(v as 'calendar' | 'list')}>
                <div className="flex justify-between items-center">
                    <TabsList>
                        <TabsTrigger value="calendar">
                            <Grid3x3 className="h-4 w-4 mr-2" />
                            Calendar View
                        </TabsTrigger>
                        <TabsTrigger value="list">
                            <List className="h-4 w-4 mr-2" />
                            List View
                        </TabsTrigger>
                    </TabsList>

                    {viewMode === 'calendar' && (
                        <div className="flex items-center gap-4">
                            <Button variant="outline" size="sm" onClick={previousMonth}>
                                <ChevronLeft className="h-4 w-4" />
                            </Button>
                            <div className="flex items-center gap-2">
                                <Calendar className="h-4 w-4 text-brand-600" />
                                <span className="font-semibold text-lg">
                                    {monthNames[month]} {year}
                                </span>
                            </div>
                            <Button variant="outline" size="sm" onClick={nextMonth}>
                                <ChevronRight className="h-4 w-4" />
                            </Button>
                        </div>
                    )}
                </div>

                {/* Calendar View */}
                <TabsContent value="calendar" className="mt-6">
                    <Card>
                        <CardContent className="p-6">
                            {/* Calendar Grid */}
                            <div className="grid grid-cols-7 gap-2">
                                {/* Day Headers */}
                                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                                    <div key={day} className="text-center font-semibold text-sm text-neutral-600 py-2">
                                        {day}
                                    </div>
                                ))}

                                {/* Empty cells for days before month starts */}
                                {Array.from({ length: startingDayOfWeek }).map((_, index) => (
                                    <div key={`empty-${index}`} className="min-h-[120px] bg-neutral-50 rounded-lg" />
                                ))}

                                {/* Calendar days */}
                                {Array.from({ length: daysInMonth }).map((_, index) => {
                                    const day = index + 1;
                                    const date = new Date(year, month, day);
                                    const dayPosts = getPostsForDate(date);
                                    const isToday = date.toDateString() === new Date().toDateString();

                                    return (
                                        <div
                                            key={day}
                                            className={`min-h-[120px] border-2 rounded-lg p-2 transition-all hover:border-brand-300 ${isToday ? 'border-brand-500 bg-brand-50' : 'border-neutral-200 bg-white'
                                                }`}
                                        >
                                            <div className={`text-sm font-semibold mb-2 ${isToday ? 'text-brand-600' : 'text-neutral-700'}`}>
                                                {day}
                                            </div>
                                            <div className="space-y-1">
                                                {dayPosts.map((post) => (
                                                    <div
                                                        key={post.id}
                                                        className="text-xs p-1.5 rounded bg-blue-100 border border-blue-200 cursor-pointer hover:bg-blue-200 transition-colors"
                                                    >
                                                        <div className="font-medium text-blue-900 truncate">
                                                            {post.title}
                                                        </div>
                                                        <div className="flex items-center gap-1 mt-1">
                                                            {post.platform.slice(0, 2).map((p) => (
                                                                <span key={p} className="text-xs">
                                                                    {getPlatformIcon(p)}
                                                                </span>
                                                            ))}
                                                            {post.platform.length > 2 && (
                                                                <span className="text-xs text-blue-700">+{post.platform.length - 2}</span>
                                                            )}
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* List View */}
                <TabsContent value="list" className="mt-6">
                    <Card>
                        <CardContent className="p-6">
                            <div className="space-y-4">
                                {posts.map((post) => (
                                    <div
                                        key={post.id}
                                        className="flex items-start gap-4 p-4 border border-neutral-200 rounded-lg hover:border-brand-300 transition-colors"
                                    >
                                        <div className="flex-1">
                                            <div className="flex items-start justify-between mb-2">
                                                <div>
                                                    <h3 className="font-semibold text-default-font">{post.title}</h3>
                                                    <p className="text-sm text-subtext-color mt-1">{post.caption}</p>
                                                </div>
                                                <Badge variant="outline" className={getStatusColor(post.status)}>
                                                    {post.status.replace('_', ' ')}
                                                </Badge>
                                            </div>
                                            <div className="flex items-center gap-4 text-sm text-neutral-600">
                                                <div className="flex items-center gap-1">
                                                    <Calendar className="h-4 w-4" />
                                                    <span>{post.scheduledDate.toLocaleString()}</span>
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    {post.platform.map((p) => (
                                                        <span key={p}>{getPlatformIcon(p)}</span>
                                                    ))}
                                                </div>
                                                <div className="flex gap-1">
                                                    {post.hashtags.map((tag) => (
                                                        <span key={tag} className="text-brand-600">{tag}</span>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex gap-2">
                                            <Button variant="outline" size="sm">Edit</Button>
                                            <Button variant="outline" size="sm">View</Button>
                                        </div>
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
