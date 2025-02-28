import React from 'react';

interface PageHeaderProps {
  heading: string;
  text?: string;
  children?: React.ReactNode;
}

export function PageHeader({ heading, text, children }: PageHeaderProps) {
  return (
    <div className='flex flex-col gap-1 mb-8'>
      <h1 className='text-3xl font-bold tracking-tight'>{heading}</h1>
      {text && <p className='text-lg text-muted-foreground'>{text}</p>}
      {children}
    </div>
  );
}
