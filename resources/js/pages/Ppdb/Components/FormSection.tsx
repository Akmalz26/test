import React, { ReactNode } from 'react';

interface FormSectionProps {
  title: string;
  description?: string;
  icon?: ReactNode;
  children: ReactNode;
}

export default function FormSection({ title, description, icon, children }: FormSectionProps) {
  return (
    <div className="p-6 border-b border-gray-200 last:border-b-0">
      <div className="mb-6">
        <div className="flex items-center mb-2">
          {icon && <div className="mr-2 text-orange-500">{icon}</div>}
          <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
        </div>
        {description && <p className="text-gray-600 text-sm">{description}</p>}
      </div>
      
      <div className="space-y-6">
        {children}
      </div>
    </div>
  );
} 