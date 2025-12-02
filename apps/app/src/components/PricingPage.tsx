import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@realtyeaseai/ui';
import { Button } from '@realtyeaseai/ui';
import { Badge } from '@realtyeaseai/ui';
import { Switch } from '@realtyeaseai/ui';
import { CheckCircle, X, Zap, Star, HelpCircle } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@realtyeaseai/ui';

const pricingTiers = [
  {
    id: 'starter',
    name: 'Starter',
    hours: 40,
    price: 999,
    description: 'Perfect for solo entrepreneurs and new businesses.',
    features: [
      '40 VA Hours/Month',
      '1 Dedicated VA',
      'Basic AI Tools',
      'Weekly Reports',
      'Email Support'
    ],
    aiBundlePrice: 1499,
    popular: false
  },
  {
    id: 'growth',
    name: 'Growth',
    hours: 80,
    price: 1999,
    description: 'Ideal for growing businesses and small teams.',
    features: [
      '80 VA Hours/Month',
      '1 Dedicated VA',
      'Pro AI Tools',
      'Bi-weekly Strategy Calls',
      'Priority Email Support',
      'Social Media Management'
    ],
    aiBundlePrice: 2699,
    popular: true
  },
  {
    id: 'business',
    name: 'Business',
    hours: 120,
    price: 2999,
    description: 'For established businesses with multiple revenue streams.',
    features: [
      '120 VA Hours/Month',
      '1-2 Dedicated VAs',
      'Elite AI Tools',
      'Weekly Strategy Calls',
      'Priority Support',
      'Content Marketing Strategy'
    ],
    aiBundlePrice: 4299,
    popular: false
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    hours: 160,
    price: 3999,
    description: 'Full-time support for large organizations.',
    features: [
      '160 VA Hours/Month',
      '2-3 Dedicated VAs',
      'Elite AI Tools + Custom',
      'Daily Strategy Calls',
      '24/7 Priority Support',
      'Dedicated Account Manager'
    ],
    aiBundlePrice: 6999,
    popular: false
  }
];

const aiAddons = [
  {
    id: 'basic',
    name: 'Basic AI Tools',
    price: 0,
    description: 'Essential tools for productivity.',
    features: ['Social Scheduler', 'Grammar Checker', 'Email Templates']
  },
  {
    id: 'pro',
    name: 'Pro AI Tools',
    price: 199,
    description: 'Advanced tools for content and automation.',
    features: ['AI Content Writer', 'Graphic Design AI', 'Video Editing AI', 'SEO Suite']
  },
  {
    id: 'elite',
    name: 'Elite AI Tools',
    price: 499,
    description: 'Cutting-edge AI for scaling.',
    features: ['Custom AI Agents', 'Predictive Analytics', 'API Access', 'Voice Assistant']
  }
];

export function PricingPage() {
  const [isAnnual, setIsAnnual] = useState(false);
  const [bundleAI, setBundleAI] = useState(false);
  const [selectedAddons, setSelectedAddons] = useState<string[]>(['basic']);

  const toggleAddon = (addonId: string) => {
    if (addonId === 'basic') return; // Basic is always included
    setSelectedAddons(prev => 
      prev.includes(addonId) 
        ? prev.filter(id => id !== addonId)
        : [...prev, addonId]
    );
  };

  const calculatePrice = (tier: typeof pricingTiers[0]) => {
    let basePrice = bundleAI ? tier.aiBundlePrice : tier.price;
    
    if (!bundleAI) {
      // Add selected add-ons price if not bundled (assuming bundle includes best suitable tier)
      // Actually, bundle implies specific AI tier. 
      // Let's stick to the plan: Bundle includes specific AI tier.
      // If not bundled, user pays base + selected add-ons.
      const addonsPrice = selectedAddons.reduce((sum, id) => {
        const addon = aiAddons.find(a => a.id === id);
        return sum + (addon ? addon.price : 0);
      }, 0);
      basePrice += addonsPrice;
    }

    if (isAnnual) {
      basePrice = basePrice * 10; // 12 months for price of 10
    }

    return basePrice;
  };

  return (
    <div className="py-12 px-4 md:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight mb-4">Flexible Pricing for Your Growth</h1>
        <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
          Choose the perfect balance of human expertise and AI power.
        </p>
        
        <div className="flex items-center justify-center gap-6 mt-8">
          <div className="flex items-center gap-2">
            <span className={`text-sm font-medium ${!isAnnual ? 'text-neutral-900' : 'text-neutral-500'}`}>Monthly</span>
            <Switch checked={isAnnual} onCheckedChange={setIsAnnual} />
            <span className={`text-sm font-medium ${isAnnual ? 'text-neutral-900' : 'text-neutral-500'}`}>
              Yearly <span className="text-green-600 font-bold">(Save 20%)</span>
            </span>
          </div>
          
          <div className="flex items-center gap-2 ml-8">
             <span className={`text-sm font-medium ${!bundleAI ? 'text-neutral-900' : 'text-neutral-500'}`}>VA Only</span>
             <Switch checked={bundleAI} onCheckedChange={setBundleAI} />
             <span className={`text-sm font-medium ${bundleAI ? 'text-neutral-900' : 'text-neutral-500'}`}>
               VA + AI Bundle
             </span>
          </div>
        </div>
      </div>

      {!bundleAI && (
        <div className="mb-12 bg-neutral-50 p-6 rounded-xl border border-neutral-200">
          <h3 className="text-lg font-semibold mb-4 text-center">Customize Your AI Add-ons</h3>
          <div className="grid md:grid-cols-3 gap-4">
            {aiAddons.map(addon => (
              <div 
                key={addon.id}
                className={`p-4 rounded-lg border cursor-pointer transition-all ${
                  selectedAddons.includes(addon.id) 
                    ? 'border-violet-500 bg-violet-50 ring-1 ring-violet-500' 
                    : 'border-neutral-200 hover:border-violet-300'
                }`}
                onClick={() => toggleAddon(addon.id)}
              >
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-medium">{addon.name}</h4>
                  {selectedAddons.includes(addon.id) && <CheckCircle className="h-5 w-5 text-violet-600" />}
                </div>
                <p className="text-2xl font-bold mb-1">
                  {addon.price === 0 ? 'Free' : `$${addon.price}`}
                  <span className="text-sm font-normal text-neutral-500">/mo</span>
                </p>
                <p className="text-sm text-neutral-600 mb-3">{addon.description}</p>
                <ul className="text-xs space-y-1 text-neutral-500">
                  {addon.features.map((f, i) => (
                    <li key={i}>• {f}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        {pricingTiers.map(tier => (
          <Card key={tier.id} className={`relative flex flex-col ${tier.popular ? 'border-violet-500 shadow-lg scale-105 z-10' : 'border-neutral-200'}`}>
            {tier.popular && (
              <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                <Badge className="bg-violet-600 hover:bg-violet-700 px-3 py-1">Most Popular</Badge>
              </div>
            )}
            <CardHeader>
              <CardTitle className="text-2xl">{tier.name}</CardTitle>
              <CardDescription>{tier.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-1">
              <div className="mb-6">
                <span className="text-4xl font-bold">${calculatePrice(tier)}</span>
                <span className="text-neutral-500">/{isAnnual ? 'year' : 'mo'}</span>
                {isAnnual && (
                  <p className="text-sm text-green-600 font-medium mt-1">
                    Save ${((bundleAI ? tier.aiBundlePrice : tier.price) * 2).toLocaleString()}
                  </p>
                )}
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center gap-2 font-medium">
                  <Zap className="h-5 w-5 text-violet-500" />
                  {tier.hours} Hours/Month
                </div>
                <ul className="space-y-3">
                  {tier.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-neutral-600">
                      <CheckCircle className="h-4 w-4 text-green-500 shrink-0 mt-0.5" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
            <CardFooter>
              <Button className={`w-full ${tier.popular ? 'bg-violet-600 hover:bg-violet-700' : ''}`} variant={tier.popular ? 'default' : 'outline'}>
                Get Started
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
