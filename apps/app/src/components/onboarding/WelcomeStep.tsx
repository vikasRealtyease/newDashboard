import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@repo/ui';
import { Button } from '@repo/ui';
import { Input } from '@repo/ui';
import { Label } from '@repo/ui';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@repo/ui';
import { ArrowRight } from 'lucide-react';

export function WelcomeStep() {
    const [formData, setFormData] = useState({
        businessName: '',
        industry: '',
        role: '',
        teamSize: ''
    });

    const handleChange = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    return (
        <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8">
                <h1 className="text-3xl font-bold mb-2">Welcome to Your AI-Enhanced Workforce</h1>
                <p className="text-neutral-600">Let's get your workspace set up in just a few minutes.</p>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Tell us about your business</CardTitle>
                    <CardDescription>This helps us customize your dashboard and AI recommendations.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="businessName">Business Name</Label>
                        <Input
                            id="businessName"
                            placeholder="Acme Corp"
                            value={formData.businessName}
                            onChange={(e) => handleChange('businessName', e.target.value)}
                        />
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="industry">Industry</Label>
                            <Select onValueChange={(val) => handleChange('industry', val)}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select industry" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="tech">Technology</SelectItem>
                                    <SelectItem value="marketing">Marketing Agency</SelectItem>
                                    <SelectItem value="ecommerce">E-commerce</SelectItem>
                                    <SelectItem value="realestate">Real Estate</SelectItem>
                                    <SelectItem value="consulting">Consulting</SelectItem>
                                    <SelectItem value="other">Other</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="role">Your Role</Label>
                            <Input
                                id="role"
                                placeholder="Founder, CEO, etc."
                                value={formData.role}
                                onChange={(e) => handleChange('role', e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="teamSize">Team Size</Label>
                        <Select onValueChange={(val) => handleChange('teamSize', val)}>
                            <SelectTrigger>
                                <SelectValue placeholder="How many people?" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="1">Just me (Solo)</SelectItem>
                                <SelectItem value="2-5">2-5 people</SelectItem>
                                <SelectItem value="6-10">6-10 people</SelectItem>
                                <SelectItem value="11-25">11-25 people</SelectItem>
                                <SelectItem value="25+">25+ people</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </CardContent>
                <CardFooter>
                    <Button className="w-full">
                        Continue <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
}
