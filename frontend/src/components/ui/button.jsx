import React from 'react';

export const Button = React.forwardRef(({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  className = '', 
  disabled = false,
  type = 'button',
  ...props 
}, ref) => {
  const baseStyles = 'inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variants = {
    primary: 'bg-primary text-primary-foreground hover:bg-primary-hover focus:ring-primary shadow-md hover:shadow-lg',
    secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary-hover focus:ring-secondary shadow-md hover:shadow-lg',
    accent: 'bg-accent text-accent-foreground hover:opacity-90 focus:ring-accent shadow-md hover:shadow-lg',
    outline: 'border-2 border-primary text-primary bg-transparent hover:bg-primary hover:text-primary-foreground focus:ring-primary',
    ghost: 'text-primary hover:bg-primary-light focus:ring-primary',
    destructive: 'bg-destructive text-destructive-foreground hover:opacity-90 focus:ring-destructive shadow-md',
  };
  
  const sizes = {
    sm: 'px-4 py-2 text-sm rounded-md',
    md: 'px-6 py-2.5 text-base rounded-lg',
    lg: 'px-8 py-3 text-lg rounded-lg',
  };
  
  return (
    <button
      ref={ref}
      type={type}
      disabled={disabled}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
});

Button.displayName = 'Button';