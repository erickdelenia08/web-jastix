import React from 'react';

export const Textarea = React.forwardRef(({ 
  className = '',
  error = false,
  ...props 
}, ref) => {
  return (
    <textarea
      ref={ref}
      className={`w-full px-4 py-2.5 bg-background border rounded-lg text-foreground placeholder:text-muted-foreground transition-all duration-200 resize-vertical min-h-[100px] ${
        error 
          ? 'border-destructive focus:border-destructive focus:ring-destructive' 
          : 'border-input focus:border-primary focus:ring-primary'
      } ${className}`}
      {...props}
    />
  );
});

Textarea.displayName = 'Textarea';