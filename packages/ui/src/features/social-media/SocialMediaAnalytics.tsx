"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../card';
import { Badge } from '../../badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../tabs';
import {
    TrendingUp,
    TrendingDown,
    Users,
    Heart,
    MessageCircle,
    Share2,
    Eye,
    BarChart3
} from 'lucide-react';

export function SocialMediaAnalytics() {
    const platforms = [
        { id: 'facebook', name: 'Facebook', icon: '📘', color: 'blue' },
        { id: 'instagram', name: 'Instagram', icon: '📷', color: 'purple' },
        { id: 'linkedin', name: 'LinkedIn', icon: '💼', color: 'blue' },
        { id: 'twitter', name: 'Twitter/X', icon: '🐦', color: 'sky' },
    ];

    const overallStats = [
        { label: 'Total Followers', value: '24.5K', change: '+12.5%', trend: 'up', icon: Users },
        { label: 'Engagement Rate', value: '4.8%', change: '+0.8%', trend: 'up', icon: Heart },
        { label: 'Total Reach', value: '156K', change: '+23.4%', trend: 'up', icon: Eye },
        { label: 'Posts Published', value: '48', change: '+6', trend: 'up', icon: BarChart3 },
    ];

    const platformStats = {
        facebook: {
            followers: '12.3K',
            engagement: '3.2%',
            reach: '45K',
            posts: 15,
            topPost: 'New Property Listing - Downtown Condo',
            topPostEngagement: '892',
        },
        instagram: {
            followers: '8.7K',
            engagement: '6.5%',
            reach: '67K',
            posts: 18,
            topPost: 'Beautiful Sunset View from Penthouse',
            topPostEngagement: '1,234',
        },
        linkedin: {
            followers: '2.8K',
            engagement: '4.1%',
            reach: '28K',
            posts: 10,
            topPost: 'Market Trends Report Q4 2025',
            topPostEngagement: '456',
        },
        twitter: {
            followers: '1.7K',
            engagement: '2.9%',
            reach: '16K',
            posts: 5,
            topPost: 'Quick Tips for First-Time Homebuyers',
            topPostEngagement: '234',
        },
    };

    const recentPosts = [
        {
            id: '1',
            title: 'New Property Listing - Downtown Condo',
            platform: 'facebook',
            publishedAt: '2 hours ago',
            likes: 234,
            comments: 45,
            shares: 12,
            reach: 5600,
        },
        {
            id: '2',
            title: 'Beautiful Sunset View from Penthouse',
            platform: 'instagram',
            publishedAt: '5 hours ago',
            likes: 567,
            comments: 89,
            shares: 23,
            reach: 8900,
        },
        {
            id: '3',
            title: 'Market Trends Report Q4 2025',
            platform: 'linkedin',
            publishedAt: '1 day ago',
            likes: 123,
            comments: 34,
            shares: 56,
            reach: 4200,
        },
    ];

    return (
        <div className="space-y-6">
            {/* Overall Stats */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {overallStats.map((stat) => {
                    const Icon = stat.icon;
                    return (
                        <Card key={stat.label}>
                            <CardContent className="pt-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm text-neutral-600">{stat.label}</p>
                                        <p className="text-3xl font-bold mt-2">{stat.value}</p>
                                        <div className="flex items-center gap-1 mt-2">
                                            {stat.trend === 'up' ? (
                                                <TrendingUp className="h-4 w-4 text-green-600" />
                                            ) : (
                                                <TrendingDown className="h-4 w-4 text-red-600" />
                                            )}
                                            <span className={`text-sm font-medium ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
                                                }`}>
                                                {stat.change}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="h-12 w-12 rounded-full bg-brand-100 flex items-center justify-center">
                                        <Icon className="h-6 w-6 text-brand-600" />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    );
                })}
            </div>

            {/* Platform Breakdown */}
            <Card>
                <CardHeader>
                    <CardTitle>Platform Performance</CardTitle>
                    <CardDescription>Detailed metrics for each social media platform</CardDescription>
                </CardHeader>
                <CardContent>
                    <Tabs defaultValue="facebook">
                        <TabsList className="grid w-full grid-cols-4">
                            {platforms.map((platform) => (
                                <TabsTrigger key={platform.id} value={platform.id}>
                                    <span className="mr-2">{platform.icon}</span>
                                    {platform.name}
                                </TabsTrigger>
                            ))}
                        </TabsList>

                        {platforms.map((platform) => {
                            const stats = platformStats[platform.id as keyof typeof platformStats];
                            return (
                                <TabsContent key={platform.id} value={platform.id} className="mt-6">
                                    <div className="grid gap-4 md:grid-cols-4 mb-6">
                                        <div className="p-4 border border-neutral-200 rounded-lg">
                                            <p className="text-sm text-neutral-600">Followers</p>
                                            <p className="text-2xl font-bold mt-1">{stats.followers}</p>
                                        </div>
                                        <div className="p-4 border border-neutral-200 rounded-lg">
                                            <p className="text-sm text-neutral-600">Engagement</p>
                                            <p className="text-2xl font-bold mt-1">{stats.engagement}</p>
                                        </div>
                                        <div className="p-4 border border-neutral-200 rounded-lg">
                                            <p className="text-sm text-neutral-600">Reach</p>
                                            <p className="text-2xl font-bold mt-1">{stats.reach}</p>
                                        </div>
                                        <div className="p-4 border border-neutral-200 rounded-lg">
                                            <p className="text-sm text-neutral-600">Posts</p>
                                            <p className="text-2xl font-bold mt-1">{stats.posts}</p>
                                        </div>
                                    </div>

                                    <div className="p-4 bg-gradient-to-br from-brand-50 to-purple-50 border border-brand-200 rounded-lg">
                                        <p className="text-sm font-medium text-brand-900 mb-2">🏆 Top Performing Post</p>
                                        <p className="font-semibold text-default-font">{stats.topPost}</p>
                                        <p className="text-sm text-subtext-color mt-1">
                                            {stats.topPostEngagement} total engagements
                                        </p>
                                    </div>
                                </TabsContent>
                            );
                        })}
                    </Tabs>
                </CardContent>
            </Card>

            {/* Recent Posts Performance */}
            <Card>
                <CardHeader>
                    <CardTitle>Recent Posts</CardTitle>
                    <CardDescription>Performance of your latest published content</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {recentPosts.map((post) => {
                            const platform = platforms.find(p => p.id === post.platform);
                            return (
                                <div
                                    key={post.id}
                                    className="flex items-start gap-4 p-4 border border-neutral-200 rounded-lg hover:border-brand-300 transition-colors"
                                >
                                    <div className="text-3xl">{platform?.icon}</div>
                                    <div className="flex-1">
                                        <div className="flex items-start justify-between mb-2">
                                            <div>
                                                <h3 className="font-semibold text-default-font">{post.title}</h3>
                                                <p className="text-sm text-subtext-color">{post.publishedAt}</p>
                                            </div>
                                            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                                                Published
                                            </Badge>
                                        </div>
                                        <div className="grid grid-cols-4 gap-4 mt-3">
                                            <div className="flex items-center gap-2 text-sm">
                                                <Heart className="h-4 w-4 text-red-500" />
                                                <span className="font-medium">{post.likes}</span>
                                                <span className="text-neutral-500">Likes</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-sm">
                                                <MessageCircle className="h-4 w-4 text-blue-500" />
                                                <span className="font-medium">{post.comments}</span>
                                                <span className="text-neutral-500">Comments</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-sm">
                                                <Share2 className="h-4 w-4 text-green-500" />
                                                <span className="font-medium">{post.shares}</span>
                                                <span className="text-neutral-500">Shares</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-sm">
                                                <Eye className="h-4 w-4 text-purple-500" />
                                                <span className="font-medium">{post.reach.toLocaleString()}</span>
                                                <span className="text-neutral-500">Reach</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </CardContent>
            </Card>

            {/* Growth Chart Placeholder */}
            <Card>
                <CardHeader>
                    <CardTitle>Growth Over Time</CardTitle>
                    <CardDescription>Follower and engagement trends</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="h-64 bg-gradient-to-br from-neutral-50 to-neutral-100 rounded-lg flex items-center justify-center border-2 border-dashed border-neutral-300">
                        <div className="text-center">
                            <BarChart3 className="h-12 w-12 text-neutral-400 mx-auto mb-3" />
                            <p className="text-neutral-600 font-medium">Chart visualization coming soon</p>
                            <p className="text-sm text-neutral-500 mt-1">Integration with analytics APIs in progress</p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
