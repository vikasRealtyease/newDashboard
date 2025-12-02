import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@realtyeaseai/ui';
import { Button } from '@realtyeaseai/ui';
import { Label } from '@realtyeaseai/ui';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@realtyeaseai/ui';
import { Textarea } from '@realtyeaseai/ui';
import { Checkbox } from '@realtyeaseai/ui';
import { ArrowRight } from 'lucide-react';

export function VAPreferencesStep() {
    const [preferences, setPreferences] = useState({
        timezone: '',
        skills: [] as string[],
        communication: '',
        notes: ''
    });

    const skillsList = [
        'Social Media Management', 'Content Writing', 'Email Marketing',
        'Graphic Design', 'Video Editing', 'SEO', 'Admin Support', 'Customer Service'
    ];

    const toggleSkill = (skill: string) => {
        setPreferences(prev => ({
            ...prev,
            skills: prev.skills.includes(skill)
                ? prev.skills.filter(s => s !== skill)
                : [...prev.skills, skill]
        }));
    };

    return (
        <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8">
                <h1 className="text-3xl font-bold mb-2">Customize Your Experience</h1>
                <p className="text-neutral-600">Tell us what you need from your Virtual Assistant.</p>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>VA Preferences</CardTitle>
                    <CardDescription>We'll match you with the perfect VA based on these details.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="space-y-2">
                        <Label>Required Skills (Select all that apply)</Label>
                        <div className="grid grid-cols-2 gap-3 mt-2">
                            {skillsList.map(skill => (
                                <div key={skill} className="flex items-center space-x-2">
                                    <Checkbox
                                        id={skill}
                                        checked={preferences.skills.includes(skill)}
                                        onCheckedChange={() => toggleSkill(skill)}
                                    />
                                    <label
                                        htmlFor={skill}
                                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    >
                                        {skill}
                                    </label>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="timezone">Preferred Time Zone</Label>
                        <Select onValueChange={(val) => setPreferences(prev => ({ ...prev, timezone: val }))}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select time zone" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="est">Eastern Time (ET)</SelectItem>
                                <SelectItem value="pst">Pacific Time (PT)</SelectItem>
                                <SelectItem value="gmt">GMT/London</SelectItem>
                                <SelectItem value="aest">Australian Eastern (AEST)</SelectItem>
                                <SelectItem value="flexible">Flexible / Any</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="communication">Communication Style</Label>
                        <Select onValueChange={(val) => setPreferences(prev => ({ ...prev, communication: val }))}>
                            <SelectTrigger>
                                <SelectValue placeholder="How do you prefer to communicate?" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="slack">Slack / Messaging</SelectItem>
                                <SelectItem value="email">Email</SelectItem>
                                <SelectItem value="video">Video Calls</SelectItem>
                                <SelectItem value="mixed">Mixed</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="notes">Additional Notes</Label>
                        <Textarea
                            id="notes"
                            placeholder="Any specific requirements or tools you use?"
                            value={preferences.notes}
                            onChange={(e) => setPreferences(prev => ({ ...prev, notes: e.target.value }))}
                        />
                    </div>
                </CardContent>
                <CardFooter>
                    <Button className="w-full">
                        Complete Setup <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
}
