import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../components/ui/card';
import { ProgressIndicator } from '../components/ProgressIndicator';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';

export const RulesPage = () => {
  const navigate = useNavigate();
  const [accepted, setAccepted] = useState(false);
  
  const rules = [
    {
      category: 'Physical Requirements',
      icon: '💪',
      items: [
        'Must be physically fit and in good health',
        'Minimum age: 12 years old (minors must be accompanied by adults)',
        'Not recommended for pregnant women or people with heart conditions',
        'Able to walk for extended periods on uneven terrain'
      ]
    },
    {
      category: 'Required Documents',
      icon: '📄',
      items: [
        'Valid ID card (KTP/SIM/Passport)',
        'Health insurance or travel insurance (recommended)',
        'Emergency contact information',
        'Medical certificate if required by physician'
      ]
    },
    {
      category: 'Equipment Requirements',
      icon: '🎒',
      items: [
        'Proper hiking boots with good grip',
        'Weather-appropriate clothing (layers recommended)',
        'Rain gear and warm jacket',
        'Sufficient water (minimum 2 liters per person)',
        'Headlamp or flashlight with extra batteries',
        'Personal medications and first aid kit'
      ]
    },
    {
      category: 'Environmental Rules',
      icon: '🌿',
      items: [
        'Leave no trace - carry out all waste',
        'Stay on designated trails',
        'Do not disturb wildlife or pick plants',
        'No littering - keep the mountain clean',
        'Respect local customs and traditions'
      ]
    },
    {
      category: 'Safety Guidelines',
      icon: '⚠️',
      items: [
        'Follow guide instructions at all times',
        'Stay with your group - do not wander alone',
        'Report any health issues immediately',
        'Weather can change quickly - be prepared',
        'Emergency evacuation procedures will be explained by guide'
      ]
    },
    {
      category: 'Prohibited Items',
      icon: '🚫',
      items: [
        'Alcoholic beverages and illegal drugs',
        'Firearms, weapons, or explosives',
        'Single-use plastics',
        'Pets or animals',
        'Sound systems or loud equipment'
      ]
    }
  ];
  
  const handleAccept = () => {
    if (accepted) {
      navigate('/registration');
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-gradient-subtle">
      <Navbar />
      
      <div className="flex-1 py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <ProgressIndicator currentStep={2} />
          
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-4xl sm:text-5xl font-heading font-bold text-foreground mb-4">
                Hiking Rules & Requirements
              </h1>
              <p className="text-lg text-muted-foreground">
                Please read and understand all rules before proceeding with registration
              </p>
            </div>
            
            <Card className="mb-6">
              <CardHeader className="bg-accent/10">
                <CardTitle className="flex items-center text-accent">
                  <svg className="w-6 h-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Important Notice
                </CardTitle>
                <CardDescription>
                  These rules are designed to ensure your safety and preserve the natural environment. 
                  Violation of these rules may result in denied entry or evacuation without refund.
                </CardDescription>
              </CardHeader>
            </Card>
            
            <div className="space-y-6 mb-8">
              {rules.map((section, index) => (
                <Card key={index} className="overflow-hidden animate-fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
                  <CardHeader className="bg-primary-light/30">
                    <CardTitle className="flex items-center text-lg">
                      <span className="text-2xl mr-3">{section.icon}</span>
                      {section.category}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <ul className="space-y-3">
                      {section.items.map((item, itemIndex) => (
                        <li key={itemIndex} className="flex items-start">
                          <svg className="w-5 h-5 text-primary mr-3 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                          <span className="text-foreground">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            <Card className="bg-muted/50">
              <CardContent className="pt-6">
                <label className="flex items-start cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={accepted}
                    onChange={(e) => setAccepted(e.target.checked)}
                    className="mt-1 mr-4 w-5 h-5 text-primary border-border rounded focus:ring-2 focus:ring-primary cursor-pointer"
                  />
                  <span className="text-foreground group-hover:text-primary transition-colors">
                    I have read and understood all the rules and requirements above. I agree to follow these guidelines 
                    and understand that failure to comply may result in denied entry or evacuation without refund.
                  </span>
                </label>
                
                <div className="flex gap-4 mt-6">
                  <Button 
                    variant="outline" 
                    className="flex-1"
                    onClick={() => navigate('/')}
                  >
                    Go Back
                  </Button>
                  <Button 
                    className="flex-1"
                    disabled={!accepted}
                    onClick={handleAccept}
                  >
                    Accept & Continue
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};