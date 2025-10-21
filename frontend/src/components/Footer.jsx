import React from 'react';

export const Footer = () => {
  return (
    <footer className="bg-secondary text-secondary-foreground mt-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-heading font-semibold mb-4">TrailTix</h3>
            <p className="text-secondary-foreground/80 text-sm">
              Your trusted partner for mountain hiking adventures. Book your next outdoor experience with confidence.
            </p>
          </div>
          
          <div>
            <h4 className="text-base font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm text-secondary-foreground/80">
              <li><a href="/" className="hover:text-white transition-colors">Destinations</a></li>
              <li><a href="/" className="hover:text-white transition-colors">Safety Guidelines</a></li>
              <li><a href="/" className="hover:text-white transition-colors">FAQs</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-base font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-sm text-secondary-foreground/80">
              <li>Email: info@trailtix.com</li>
              <li>Phone: +62 812-3456-7890</li>
              <li>Emergency: +62 811-2233-4455</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white/10 mt-8 pt-8 text-center text-sm text-secondary-foreground/60">
          <p>&copy; 2024 TrailTix. All rights reserved. Stay safe, explore responsibly.</p>
        </div>
      </div>
    </footer>
  );
};