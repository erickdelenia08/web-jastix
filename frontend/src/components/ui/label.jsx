import React from 'react';

export const Label = ({ children, required = false, className = '', htmlFor, ...props }) => {
  return (
    <label
      htmlFor={htmlFor}
      className={`block text-sm font-medium text-foreground mb-2 ${className}`}
      {...props}
    >
      {children}
      {required && <span className="text-destructive ml-1">*</span>}
    </label>
  );
};