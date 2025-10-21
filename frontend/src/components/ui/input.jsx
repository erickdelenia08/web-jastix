import React from 'react';

export const Input = React.forwardRef(({ 
  type = 'text',
  className = '',
  error = false,
  ...props 
}, ref) => {
  return (
    <input
      type={type}
      ref={ref}
      className={`w-full px-4 py-2.5 bg-background border rounded-lg text-foreground placeholder:text-muted-foreground transition-all duration-200 ${
        error 
          ? 'border-destructive focus:border-destructive focus:ring-destructive' 
          : 'border-input focus:border-primary focus:ring-primary'
      } ${className}`}
      {...props}
    />
  );
});

Input.displayName = 'Input';