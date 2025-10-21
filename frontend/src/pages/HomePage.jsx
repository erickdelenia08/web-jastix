import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { ProgressIndicator } from '../components/ProgressIndicator';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';

export const HomePage = () => {
  const navigate = useNavigate();
  
  const destination = {
    name: 'Ranu Kumbolo',
    location: 'Mount Semeru, East Java',
    elevation: '2,400 MASL',
    difficulty: 'Moderate',
    duration: '2-3 Days',
    description: 'Experience the breathtaking beauty of Ranu Kumbolo, a pristine mountain lake nestled in the highlands of Mount Semeru. Crystal-clear waters reflect the surrounding peaks, creating an unforgettable adventure.',
    highlights: [
      'Stunning mountain lake views',
      'Spectacular sunrise photography',
      'Rich biodiversity and flora',
      'Traditional camping experience'
    ],
    price: 'IDR 250,000'
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1578592391689-0e3d1a1b52b9?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1NzZ8MHwxfHNlYXJjaHwxfHxtb3VudGFpbiUyMGhpa2luZ3xlbnwwfHx8fDE3NjEwNDc0NTF8MA&ixlib=rb-4.1.0&q=85)'
          }}
        />
        <div className="absolute inset-0 bg-gradient-hero" />
        
        <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto animate-fade-in-up">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-heading font-bold mb-6 leading-tight">
            Discover Your Next<br />Mountain Adventure
          </h1>
          <p className="text-lg sm:text-xl text-white/90 mb-8 max-w-2xl mx-auto leading-relaxed">
            Book your hiking experience to Indonesia's most spectacular mountain destinations
          </p>
          <Button 
            size="lg" 
            className="bg-white text-primary hover:bg-white/90 shadow-elegant"
            onClick={() => document.getElementById('destinations').scrollIntoView({ behavior: 'smooth' })}
          >
            Explore Destinations
          </Button>
        </div>
        
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-16 bg-gradient-subtle">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
              <div className="w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-heading font-semibold mb-2">Safe & Secure</h3>
              <p className="text-muted-foreground">Professional guides and safety equipment for your peace of mind</p>
            </div>
            
            <div className="text-center p-6 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              <div className="w-16 h-16 bg-accent text-accent-foreground rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-heading font-semibold mb-2">Easy Booking</h3>
              <p className="text-muted-foreground">Simple registration process with instant confirmation</p>
            </div>
            
            <div className="text-center p-6 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
              <div className="w-16 h-16 bg-success text-success-foreground rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                </svg>
              </div>
              <h3 className="text-xl font-heading font-semibold mb-2">Best Experience</h3>
              <p className="text-muted-foreground">Curated trails and expert local knowledge</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Destination Section */}
      <section id="destinations" className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Badge variant="accent" className="mb-4">Featured Destination</Badge>
            <h2 className="text-4xl sm:text-5xl font-heading font-bold text-foreground mb-4">
              Available Destination
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Start your adventure with our premier hiking destination
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <Card className="overflow-hidden hover:shadow-elegant transition-all duration-300">
              <div className="md:flex">
                <div 
                  className="md:w-2/5 h-64 md:h-auto bg-cover bg-center"
                  style={{
                    backgroundImage: 'url(https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=800)'
                  }}
                />
                
                <div className="md:w-3/5">
                  <CardHeader>
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <CardTitle>{destination.name}</CardTitle>
                        <p className="text-muted-foreground text-sm mt-1">{destination.location}</p>
                      </div>
                      <Badge variant="primary">{destination.difficulty}</Badge>
                    </div>
                    <CardDescription>{destination.description}</CardDescription>
                  </CardHeader>
                  
                  <CardContent>
                    <div className="grid grid-cols-3 gap-4 mb-6">
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">Elevation</p>
                        <p className="font-semibold text-sm">{destination.elevation}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">Duration</p>
                        <p className="font-semibold text-sm">{destination.duration}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">Price</p>
                        <p className="font-semibold text-sm text-accent">{destination.price}</p>
                      </div>
                    </div>
                    
                    <div className="mb-6">
                      <h4 className="text-sm font-semibold mb-3">Highlights</h4>
                      <ul className="space-y-2">
                        {destination.highlights.map((highlight, index) => (
                          <li key={index} className="flex items-start text-sm">
                            <svg className="w-5 h-5 text-success mr-2 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <span>{highlight}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <Button 
                      className="w-full" 
                      size="lg"
                      onClick={() => navigate('/rules')}
                    >
                      Book Now
                    </Button>
                  </CardContent>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};