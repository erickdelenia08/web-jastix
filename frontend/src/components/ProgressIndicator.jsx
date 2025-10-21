import React from 'react';

export const ProgressIndicator = ({ currentStep, totalSteps = 3 }) => {
  const steps = [
    { number: 1, label: 'Destination' },
    { number: 2, label: 'Rules' },
    { number: 3, label: 'Registration' },
  ];
  
  return (
    <div className="w-full max-w-2xl mx-auto mb-8">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => (
          <React.Fragment key={step.number}>
            <div className="flex flex-col items-center flex-1">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm transition-all duration-300 ${
                  step.number < currentStep
                    ? 'bg-success text-success-foreground'
                    : step.number === currentStep
                    ? 'bg-primary text-primary-foreground shadow-lg scale-110'
                    : 'bg-muted text-muted-foreground'
                }`}
              >
                {step.number < currentStep ? (
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  step.number
                )}
              </div>
              <span
                className={`mt-2 text-xs font-medium transition-colors duration-300 ${
                  step.number <= currentStep ? 'text-foreground' : 'text-muted-foreground'
                }`}
              >
                {step.label}
              </span>
            </div>
            
            {index < steps.length - 1 && (
              <div className="flex-1 h-0.5 mx-2 mb-6">
                <div
                  className={`h-full transition-all duration-500 ${
                    step.number < currentStep ? 'bg-success' : 'bg-muted'
                  }`}
                />
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};