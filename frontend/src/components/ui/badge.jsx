import React from 'react';

export const Badge = ({ children, variant = 'primary', className = '', ...props }) => {
  const variants = {
    primary: 'bg-primary text-primary-foreground',
    secondary: 'bg-secondary text-secondary-foreground',
    accent: 'bg-accent text-accent-foreground',
    success: 'bg-success text-success-foreground',
    muted: 'bg-muted text-muted-foreground',
    outline: 'border-2 border-primary text-primary bg-transparent',
  };
  
  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </span>
  );
};