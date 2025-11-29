"use client";

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../card';
import { Button } from '../../button';
import { Input } from '../../input';
import { Label } from '../../label';
import { Textarea } from '../../textarea';
import { Badge } from '../../badge';
import { Separator } from '../../separator';
import {
    Calendar,
    Image as ImageIcon,
    Video,
    Hash,
    Send,
    Save,
    Eye,
    X,
    Upload
} from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../tabs';

interface Platform {
    id: string;
    name: string;
    icon: string;
    enabled: boolean;
    characterLimit?: number;
}

const platforms: Platform[] = [
    { id: 'facebook', name: 'Facebook', icon: '📘', enabled: false, characterLimit: 63206 },
    { id: 'instagram', name: 'Instagram', icon: '📷', enabled: false, characterLimit: 2200 },
    { id: 'linkedin', name: 'LinkedIn', icon: '💼', enabled: false, characterLimit: 3000 },
    { id: 'twitter', name: 'Twitter/X', icon: '🐦', enabled: false, characterLimit: 280 },
    { id: 'tiktok', name: 'TikTok', icon: '🎵', enabled: false, characterLimit: 2200 },
];

export function PostCreator() {
    const [selectedPlatforms, setSelectedPlatforms] = useState<Platform[]>(platforms);
    const [caption, setCaption] = useState('');
    const [hashtags, setHashtags] = useState<string[]>([]);
    const [hashtagInput, setHashtagInput] = useState('');
    const [scheduledDate, setScheduledDate] = useState('');
    const [scheduledTime, setScheduledTime] = useState('');
    const [mediaFiles, setMediaFiles] = useState<string[]>([]);

    const togglePlatform = (platformId: string) => {
        setSelectedPlatforms(prev =>
            prev.map(p =>
                p.id === platformId ? { ...p, enabled: !p.enabled } : p
            )
        );
    };

    const addHashtag = () => {
        if (hashtagInput.trim() && !hashtags.includes(hashtagInput.trim())) {
            const tag = hashtagInput.trim().startsWith('#')
                ? hashtagInput.trim()
                : `#${hashtagInput.trim()}`;
            setHashtags([...hashtags, tag]);
            setHashtagInput('');
        }
    };

    const removeHashtag = (tag: string) => {
        setHashtags(hashtags.filter(t => t !== tag));
    };

    const getCharacterCount = () => {
        const enabledPlatforms = selectedPlatforms.filter(p => p.enabled);
        if (enabledPlatforms.length === 0) return null;

        const minLimit = Math.min(...enabledPlatforms.map(p => p.characterLimit || Infinity));
        return { current: caption.length, limit: minLimit };
    };

    const charCount = getCharacterCount();

    return (
        <div className="space-y-6">
            <div className="grid gap-6 lg:grid-cols-3">
                {/* Main Content Area */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Platform Selection */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Select Platforms</CardTitle>
                            <CardDescription>Choose where to publish this post</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                                {selectedPlatforms.map((platform) => (
                                    <button
                                        key={platform.id}
                                        onClick={() => togglePlatform(platform.id)}
                                        className={`p-4 rounded-lg border-2 transition-all ${platform.enabled
                                            ? 'border-brand-500 bg-brand-50'
                                            : 'border-neutral-200 hover:border-neutral-300'
                                            }`}
                                    >
                                        <div className="text-3xl mb-2">{platform.icon}</div>
                                        <div className="text-sm font-medium">{platform.name}</div>
                                    </button>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Content */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Post Content</CardTitle>
                            <CardDescription>Write your caption and add media</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {/* Caption */}
                            <div className="space-y-2">
                                <div className="flex justify-between items-center">
                                    <Label htmlFor="caption">Caption</Label>
                                    {charCount && (
                                        <span className={`text-sm ${charCount.current > charCount.limit
                                            ? 'text-red-600'
                                            : 'text-neutral-500'
                                            }`}>
                                            {charCount.current} / {charCount.limit}
                                        </span>
                                    )}
                                </div>
                                <Textarea
                                    id="caption"
                                    placeholder="Write your caption here..."
                                    value={caption}
                                    onChange={(e) => setCaption(e.target.value)}
                                    rows={6}
                                    className="resize-none"
                                />
                            </div>

                            {/* Hashtags */}
                            <div className="space-y-2">
                                <Label htmlFor="hashtags">Hashtags</Label>
                                <div className="flex gap-2">
                                    <div className="relative flex-1">
                                        <Hash className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
                                        <Input
                                            id="hashtags"
                                            placeholder="Add hashtag"
                                            value={hashtagInput}
                                            onChange={(e) => setHashtagInput(e.target.value)}
                                            onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addHashtag())}
                                            className="pl-10"
                                        />
                                    </div>
                                    <Button onClick={addHashtag} variant="outline">Add</Button>
                                </div>
                                {hashtags.length > 0 && (
                                    <div className="flex flex-wrap gap-2 mt-2">
                                        {hashtags.map((tag) => (
                                            <Badge key={tag} variant="secondary" className="gap-1">
                                                {tag}
                                                <button onClick={() => removeHashtag(tag)}>
                                                    <X className="h-3 w-3" />
                                                </button>
                                            </Badge>
                                        ))}
                                    </div>
                                )}
                            </div>

                            <Separator />

                            {/* Media Upload */}
                            <div className="space-y-2">
                                <Label>Media</Label>
                                <div className="border-2 border-dashed border-neutral-300 rounded-lg p-8 text-center hover:border-brand-400 transition-colors">
                                    <Upload className="h-12 w-12 mx-auto text-neutral-400 mb-3" />
                                    <p className="text-sm text-neutral-600 mb-2">
                                        Drag and drop your images or videos here
                                    </p>
                                    <Button variant="outline" size="sm">
                                        <ImageIcon className="h-4 w-4 mr-2" />
                                        Browse Files
                                    </Button>
                                    <p className="text-xs text-neutral-500 mt-2">
                                        Supports: JPG, PNG, GIF, MP4, MOV (Max 100MB)
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* AI Assistance */}
                    <Card className="border-2 border-purple-200 bg-purple-50">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <span className="text-2xl">✨</span>
                                AI Content Assistant
                            </CardTitle>
                            <CardDescription>Let AI help you create engaging content</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <div className="grid grid-cols-2 gap-2">
                                <Button variant="outline" size="sm" className="bg-white">
                                    Generate Caption
                                </Button>
                                <Button variant="outline" size="sm" className="bg-white">
                                    Suggest Hashtags
                                </Button>
                                <Button variant="outline" size="sm" className="bg-white">
                                    Improve Copy
                                </Button>
                                <Button variant="outline" size="sm" className="bg-white">
                                    Create Image
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                    {/* Scheduling */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Schedule</CardTitle>
                            <CardDescription>When to publish this post</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="date">Date</Label>
                                <div className="relative">
                                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
                                    <Input
                                        id="date"
                                        type="date"
                                        value={scheduledDate}
                                        onChange={(e) => setScheduledDate(e.target.value)}
                                        className="pl-10"
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="time">Time</Label>
                                <Input
                                    id="time"
                                    type="time"
                                    value={scheduledTime}
                                    onChange={(e) => setScheduledTime(e.target.value)}
                                />
                            </div>
                            <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                                <p className="text-xs text-blue-700">
                                    💡 <strong>Best time to post:</strong> Weekdays 10 AM - 2 PM
                                </p>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Preview */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Preview</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Tabs defaultValue="facebook">
                                <TabsList className="grid w-full grid-cols-3">
                                    <TabsTrigger value="facebook" disabled={!selectedPlatforms.find(p => p.id === 'facebook')?.enabled}>
                                        📘
                                    </TabsTrigger>
                                    <TabsTrigger value="instagram" disabled={!selectedPlatforms.find(p => p.id === 'instagram')?.enabled}>
                                        📷
                                    </TabsTrigger>
                                    <TabsTrigger value="linkedin" disabled={!selectedPlatforms.find(p => p.id === 'linkedin')?.enabled}>
                                        💼
                                    </TabsTrigger>
                                </TabsList>
                                <TabsContent value="facebook" className="mt-4">
                                    <div className="border border-neutral-200 rounded-lg p-4 bg-white">
                                        <div className="flex items-center gap-2 mb-3">
                                            <div className="h-10 w-10 rounded-full bg-brand-100 flex items-center justify-center">
                                                <span className="text-sm font-semibold text-brand-700">YB</span>
                                            </div>
                                            <div>
                                                <p className="font-semibold text-sm">Your Business</p>
                                                <p className="text-xs text-neutral-500">Just now</p>
                                            </div>
                                        </div>
                                        <p className="text-sm whitespace-pre-wrap mb-2">
                                            {caption || 'Your caption will appear here...'}
                                        </p>
                                        {hashtags.length > 0 && (
                                            <p className="text-sm text-brand-600">
                                                {hashtags.join(' ')}
                                            </p>
                                        )}
                                        {!caption && !hashtags.length && (
                                            <div className="h-32 bg-neutral-100 rounded flex items-center justify-center">
                                                <Eye className="h-8 w-8 text-neutral-400" />
                                            </div>
                                        )}
                                    </div>
                                </TabsContent>
                                <TabsContent value="instagram" className="mt-4">
                                    <div className="border border-neutral-200 rounded-lg overflow-hidden bg-white">
                                        <div className="flex items-center gap-2 p-3 border-b">
                                            <div className="h-8 w-8 rounded-full bg-brand-100" />
                                            <p className="font-semibold text-sm">your_business</p>
                                        </div>
                                        <div className="aspect-square bg-neutral-100 flex items-center justify-center">
                                            <ImageIcon className="h-12 w-12 text-neutral-400" />
                                        </div>
                                        <div className="p-3">
                                            <p className="text-sm">
                                                <span className="font-semibold">your_business</span>{' '}
                                                {caption || 'Your caption...'}
                                            </p>
                                            {hashtags.length > 0 && (
                                                <p className="text-sm text-brand-600 mt-1">
                                                    {hashtags.join(' ')}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                </TabsContent>
                                <TabsContent value="linkedin" className="mt-4">
                                    <div className="border border-neutral-200 rounded-lg p-4 bg-white">
                                        <div className="flex items-center gap-2 mb-3">
                                            <div className="h-10 w-10 rounded-full bg-brand-100" />
                                            <div>
                                                <p className="font-semibold text-sm">Your Business</p>
                                                <p className="text-xs text-neutral-500">Company • Just now</p>
                                            </div>
                                        </div>
                                        <p className="text-sm whitespace-pre-wrap">
                                            {caption || 'Your professional content...'}
                                        </p>
                                        {hashtags.length > 0 && (
                                            <p className="text-sm text-brand-600 mt-2">
                                                {hashtags.join(' ')}
                                            </p>
                                        )}
                                    </div>
                                </TabsContent>
                            </Tabs>
                        </CardContent>
                    </Card>

                    {/* Actions */}
                    <Card>
                        <CardContent className="pt-6 space-y-2">
                            <Button className="w-full" size="lg">
                                <Send className="h-4 w-4 mr-2" />
                                Schedule Post
                            </Button>
                            <Button variant="outline" className="w-full">
                                <Save className="h-4 w-4 mr-2" />
                                Save as Draft
                            </Button>
                            <Button variant="ghost" className="w-full">
                                Cancel
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
