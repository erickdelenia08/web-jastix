import React from 'react';

export const Select = React.forwardRef(({ 
  children,
  className = '',
  error = false,
  ...props 
}, ref) => {
  return (
    <select
      ref={ref}
      className={`w-full px-4 py-2.5 bg-background border rounded-lg text-foreground transition-all duration-200 cursor-pointer ${
        error 
          ? 'border-destructive focus:border-destructive focus:ring-destructive' 
          : 'border-input focus:border-primary focus:ring-primary'
      } ${className}`}
      {...props}
    >
      {children}
    </select>
  );
});

Select.displayName = 'Select';