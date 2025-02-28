'use client';

import React, { useEffect, useState, useRef } from 'react';

// Map of component names to their CSS variables
export const componentToVariableMap: Record<string, string[]> = {
  // Buttons
  'button-primary': ['--primary', '--primary-foreground'],
  'button-secondary': ['--secondary', '--secondary-foreground'],
  'button-destructive': ['--destructive', '--destructive-foreground'],
  'button-outline': ['--background', '--foreground', '--border'],
  'button-ghost': ['--background', '--foreground'],
  'button-link': ['--primary'],

  // Cards
  card: ['--card', '--card-foreground', '--border'],
  'card-header': ['--card', '--card-foreground'],
  'card-footer': ['--card', '--card-foreground'],

  // Inputs
  input: ['--input', '--border', '--ring'],
  textarea: ['--input', '--border', '--ring'],
  select: ['--input', '--border', '--ring'],

  // Typography and layout
  label: ['--foreground'],
  separator: ['--border'],
  background: ['--background'],
  foreground: ['--foreground'],

  // Interactive elements
  switch: ['--primary', '--border'],
  checkbox: ['--primary', '--border'],
  radio: ['--primary', '--border'],
  slider: ['--primary', '--border', '--muted', '--muted-foreground'],
  toggle: ['--muted', '--muted-foreground'],

  // Feedback and alerts
  'alert-default': ['--background', '--foreground', '--border'],
  'alert-destructive': ['--destructive', '--destructive-foreground'],

  // Navigation
  tabs: ['--border', '--muted', '--muted-foreground', '--primary'],
  accordion: ['--foreground', '--border'],
  menubar: ['--background', '--foreground', '--border'],
  dropdown: ['--background', '--foreground', '--border'],

  // Status indicators
  'badge-default': ['--primary', '--primary-foreground'],
  'badge-secondary': ['--secondary', '--secondary-foreground'],
  'badge-destructive': ['--destructive', '--destructive-foreground'],
  'badge-outline': ['--border', '--foreground'],

  // Data displays
  avatar: ['--muted'],
  progress: ['--primary', '--muted'],
  table: ['--background', '--foreground', '--border', '--muted'],
  popover: ['--popover', '--popover-foreground', '--border'],
  'hover-card': ['--popover', '--popover-foreground', '--border'],
  tooltip: ['--primary', '--primary-foreground'],
  dialog: ['--background', '--foreground', '--border'],
};

// Type for variable value pair
interface VariableInfo {
  name: string;
  value: string;
}

interface ThemeTooltipProps {
  children: React.ReactNode;
  component: string;
  className?: string;
}

export function ThemeTooltip({ children, component, className }: ThemeTooltipProps) {
  const cssVariables = componentToVariableMap[component] || [];
  const [variableValues, setVariableValues] = useState<VariableInfo[]>([]);
  const [showTooltip, setShowTooltip] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Format the component name for display
  const displayName = component
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  // Get the computed CSS variable values
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const root = document.documentElement;
      const computedStyle = getComputedStyle(root);

      const values = cssVariables.map(variable => {
        // Get the raw HSL value from the CSS variable
        const rawValue = computedStyle.getPropertyValue(variable).trim();

        return {
          name: variable,
          value: rawValue || 'Not set',
        };
      });

      setVariableValues(values);
    }
  }, [cssVariables]);

  return (
    <div
      ref={containerRef}
      className={`relative inline-block ${className || ''}`}
      style={{ width: '100%', height: '100%' }}
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      {children}

      {showTooltip && (
        <div
          style={{
            position: 'absolute',
            top: '-10px',
            left: '50%',
            transform: 'translate(-50%, -100%)',
            backgroundColor: 'var(--background)',
            color: 'var(--foreground)',
            border: '1px solid var(--border)',
            borderRadius: '6px',
            padding: '8px',
            zIndex: 1000,
            pointerEvents: 'none', // This ensures the tooltip doesn't interfere with clicks
            fontSize: '12px',
            minWidth: '200px',
            maxWidth: '300px',
            boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
          }}
        >
          <div
            style={{
              fontWeight: 'bold',
              marginBottom: '8px',
              borderBottom: '1px solid var(--border)',
              paddingBottom: '4px',
            }}
          >
            {displayName}
          </div>

          {variableValues.length > 0 ? (
            <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
              {variableValues.map(variable => (
                <li
                  key={variable.name}
                  style={{
                    marginBottom: '4px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <code
                    style={{
                      fontFamily: 'monospace',
                      backgroundColor: 'var(--muted)',
                      padding: '2px 4px',
                      borderRadius: '3px',
                      fontSize: '10px',
                    }}
                  >
                    {variable.name}
                  </code>

                  {variable.value !== 'Not set' && (
                    <div style={{ display: 'inline-block' }}>
                      <div
                        style={{
                          width: '12px',
                          height: '12px',
                          backgroundColor: `hsl(${variable.value})`,
                          borderRadius: '2px',
                          border: '1px solid var(--border)',
                          display: 'inline-block',
                        }}
                      />
                    </div>
                  )}
                </li>
              ))}
            </ul>
          ) : (
            <p style={{ margin: 0 }}>No specific theme variables</p>
          )}
        </div>
      )}
    </div>
  );
}
